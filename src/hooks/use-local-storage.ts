export function useLocalStorage(key: string) {
  const setTasks = (task: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(task));
    } catch (error) {
      console.log("SET_NEW_TASK", error);
    }
  };

  const getTasks = () => {
    try {
      const tasks = window.localStorage.getItem(key);
      if (tasks) {
        return JSON.parse(tasks);
      }
    } catch (error) {
      console.log("GET_TASKS", error);
    }
  };

  return { setTasks, getTasks };
}
