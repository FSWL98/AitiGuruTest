# Aiti Guru Test

Этот репозиторий - решение тестового задания на позицию Frontend разработчика React в Aiti Guru

## Запуск

```
git clone https://github.com/FSWL98/AitiGuruTest.git
cd AitiGuruTest
npm install
npm run dev
```

Или можно посмотреть на развернутую с помощью Vercel версию [по ссылке](https://aiti-guru-test-plum.vercel.app/)

## Технологии

При решении задания использован React v19, React Router, Redux Toolkit. Проект создан с помощью vite react-ts template
В качестве UI Kit выбран Ant Design

## Использование

В качестве API использован [Dummy JSON](https://dummyjson.com/) как для авторизации, так и для получения списка товаров. Для успешной авторизации нужно использовать данные любого пользователя [из списка](https://dummyjson.com/docs/users)
Пример данных:
```
username: emilys
password: emilyspass
```

Форма добавления данных не использует API, а лишь имитирует запрос