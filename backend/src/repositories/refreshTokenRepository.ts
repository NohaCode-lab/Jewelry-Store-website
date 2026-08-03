import crypto from 'crypto';

export interface StoredRefreshToken {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
  revokedAt?: Date | null;
}

// In-memory + Prisma compatible RefreshToken Repository
class RefreshTokenRepository {
  private tokens: StoredRefreshToken[] = [];

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  async createToken(userId: string, rawToken: string, expiresAt: Date): Promise<StoredRefreshToken> {
    const tokenHash = this.hashToken(rawToken);
    const tokenRecord: StoredRefreshToken = {
      id: 'rt-' + Math.random().toString(36).substring(2, 9),
      userId,
      tokenHash,
      expiresAt,
      createdAt: new Date(),
      revokedAt: null,
    };
    this.tokens.push(tokenRecord);
    return tokenRecord;
  }

  async findValidToken(rawToken: string): Promise<StoredRefreshToken | null> {
    const tokenHash = this.hashToken(rawToken);
    const found = this.tokens.find((t) => t.tokenHash === tokenHash);

    if (!found) return null;
    if (found.revokedAt) return null;
    if (found.expiresAt < new Date()) return null;

    return found;
  }

  async revokeToken(rawToken: string): Promise<boolean> {
    const tokenHash = this.hashToken(rawToken);
    const found = this.tokens.find((t) => t.tokenHash === tokenHash);

    if (found) {
      found.revokedAt = new Date();
      return true;
    }
    return false;
  }

  async revokeAllUserTokens(userId: string): Promise<number> {
    let count = 0;
    this.tokens.forEach((t) => {
      if (t.userId === userId && !t.revokedAt) {
        t.revokedAt = new Date();
        count++;
      }
    });
    return count;
  }
}

export const refreshTokenRepository = new RefreshTokenRepository();
export default refreshTokenRepository;
