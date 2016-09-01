### Приложение для просмотра и редактирования результатов турниров.

В приложении я использую связку angular и firebase в качестве хранилища данных.  Используя angular и firebase вместе, удается создать, так называемое, трехстороннее связывание, то есть модели javascript, firebase, DOM синхронизируются в реальном времени.

На данный момент в приложении 4 представления:
 * home - страница входа. На данный момент, при авторизации не отправляется запрос серверу, использовалась для тестирования работы с firebase
 * register - страница регистрации. Пока не функционирует
 * management - cтраница редактирования таблицы результатов
 * tournaments - страница просмотра таблицы результатов и графиков
 
#### #/tournaments

На данной странице можно посмотреть таблицу результатов, графики, также возможно открыть таблицу с результатми всех матчей.
Данное представление взаимодействует с контроллером TournamentsCtrl.

![alt text](https://raw.githubusercontent.com/toshibakru/FinTech/master/app/test/0.png)
![alt text](https://raw.githubusercontent.com/toshibakru/FinTech/master/app/test/1.png)

#### #/management

На данной странице можно редактировать таблицу результатов, а конкретнее, редактировать результат каждого матча, плюс можно добавлять новую команду и удалять уже существующую
![alt text](https://raw.githubusercontent.com/toshibakru/FinTech/master/app/test/2.png)
![alt text](https://raw.githubusercontent.com/toshibakru/FinTech/master/app/test/3.png)

