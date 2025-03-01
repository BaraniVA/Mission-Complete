// rewardActions.ts
import { Reward } from './RewardsHelper'; // Assuming this is the correct path

interface ClaimRewardResult {
  success: boolean;
  message: string;
  updatedPoints: number;
  claimedReward?: Reward;
}

export const claimReward = (
  reward: Reward,
  currentPoints: number,
): ClaimRewardResult => {
  // Check if reward is claimable
  if (reward.status !== 'available') {
    return {
      success: false,
      message: reward.status === 'locked' 
        ? 'Insufficient points to claim this reward' 
        : 'This reward has expired',
      updatedPoints: currentPoints,
    };
  }

  // Check if user has enough points
  if (currentPoints < reward.points) {
    return {
      success: false,
      message: 'Not enough points to claim this reward',
      updatedPoints: currentPoints,
    };
  }

  // Deduct points and handle navigation
  const newPoints = currentPoints - reward.points;

  return {
    success: true,
    message: `Successfully claimed ${reward.name}!`,
    updatedPoints: newPoints,
    claimedReward: reward,
  };
};