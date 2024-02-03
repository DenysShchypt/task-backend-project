const ctrlWrapper = (ctrl) => {
  // Створюємо функцію обгортку
  const fun = async (req, res, next) => {
    try {
      // Передаємо аргументи далі для функції в controllers
      await ctrl(req, res);
    } catch (error) {
      // Шукати далі  Middleware обробник помилок
      next(error);
    }
  };
  // Повертаємо функцію якщо не виникло помилок
  return fun;
};

export default ctrlWrapper;
