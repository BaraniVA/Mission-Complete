// RewardsHelper.ts

export interface Reward {
    id: number;
    name: string;
    description: string;
    points: number;
    status: 'available' | 'locked' | 'expired' | 'claimed';
    deadline: string;
  }
  
  /**
   * Function to process rewards based on user points.
   * @param rewards - Base rewards list.
   * @param currentPoints - User's total points.
   * @returns Updated rewards list with expiration logic.
   */
  export const processRewards = (rewards: Reward[], currentPoints: number): Reward[] => {
    const today = new Date();
  
    return rewards.map((reward) => {
      if (currentPoints >= reward.points) {
        const expiryDate = new Date();
        expiryDate.setDate(today.getDate() + 30); // 30-day expiration from today
  
        return {
          ...reward,
          status: 'available',
          deadline: expiryDate.toISOString().split('T')[0], // Format: YYYY-MM-DD
        };
      } else {
        return {
          ...reward,
          status: 'locked',
          deadline: 'INSUFFICIENT POINTS',
        };
      }
    });
  };
  