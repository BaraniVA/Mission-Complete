export const calculateAccuracy = (tasks: { revisions?: number }[]) => {
  const totalTasks = tasks.length;
  const accurateTasks = tasks.filter(task => !task.revisions || task.revisions === 0).length;
  const accuracy = totalTasks > 0 ? Math.round((accurateTasks / totalTasks) * 100) : 100;
  return accuracy;
};
