const userCarts: Record<string, any[]> = {};

export const cartService = {
  async getUserCart(userId: string) {
    return userCarts[userId] || [];
  },

  async addItem(userId: string, itemData: any) {
    if (!userCarts[userId]) userCarts[userId] = [];
    const item = { id: 'item-' + Math.random().toString(36).substring(2, 9), ...itemData };
    userCarts[userId].push(item);
    return userCarts[userId];
  },

  async removeItem(userId: string, itemId: string) {
    if (userCarts[userId]) {
      userCarts[userId] = userCarts[userId].filter((i) => i.id !== itemId);
    }
    return userCarts[userId] || [];
  },
};
