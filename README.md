# Aircraft-Maintenance-Fullstack-App-Curs

Веб-приложение для выпускной квалификационной работы в институте среднего профессионального образования имени Петра
Великого

## Технологии

- **Spring Boot 3**

- **Spring Cloud**

- **Spring Data JPA**

- **Spring Security**

- **PostgreSQL**

- **Mailhog**

- **Keycloak**

- **FlyWay**

- **JasperReport**

- **Thymeleaf**

- **Angular 16**

- **OpenAPI**

- **WebSocket**

## Запуск

Для запуска в корне проекта есть `docker-compose.yml` файл, который содержит в себе сервисы для запуска бд, keycloak, mailhog
```bash
docker compose up -d
```

Фронтенд и бэкенд запускаются отдельно, так как бэкенд не принимает запросы с фронтенда с keycloak через docker сеть (HTTP 403 Forbidden)

## Настройка Keycloak

Для сохранения настроек используется импорт настроенного realm из файла: `./Aircraft-Maintenance-Java-Spring-Boot-Curs/src/main/resources/keycloak/import/aircraft-maintenance.json`

Также бд с таблицами keycloak настроена (через `docker-compose.yml`) на PostgreSQL бд приложения

## Функционал

### Инженер

для тестовых данных при переходе на `http://localhost:4200` можно ввести:
```json
"email" : "user1@mail.com"
"пароль" : "password"
```

#### Страница "выполненные работы"

внешний вид

![изображение](https://github.com/user-attachments/assets/be94fd37-8e95-432d-9fd6-3cf3ea1642a4)

фильтрация данных по дате формата дд.мм.гггг:

![изображение](https://github.com/user-attachments/assets/f12115cd-7bb3-4d10-aaf1-fd6e9db81ab5)

ошибка, если записи по данной дате не найдены

![изображение](https://github.com/user-attachments/assets/1bc60563-c3c1-4c10-923d-ebb52d428206)

при нажатии на кнопку `добавить` происходит переход на страницу для добавления выполненной работы

![изображение](https://github.com/user-attachments/assets/ff104e03-7a5d-4e8f-ba99-2f2e64179697)

если данные введены корректно, то происходит переход на страницу "выполненны работы" и повляется alert о том, что запись добавлена

![изображение](https://github.com/user-attachments/assets/23e52900-a056-417d-836b-94d71c671d9c)

если есть ошибки, то они выводятся в зависимости от того в каком поле была ошибка

![изображение](https://github.com/user-attachments/assets/7b5cfb48-b342-44a4-8469-fae551c5022f)

если нажать на кнопку `изменить` у ранее добавленной записи, то происходит переход на форму для изменения записи, куда копируются данные с выбранной записи

![изображение](https://github.com/user-attachments/assets/0c44b3fb-8d74-4e85-bdba-c220cdbda313)

ошибки выводятся те же, что и пре добавлении записи

если все данные заполнены корректно, то происходит переход на страницу "выполненны работы" и повляется alert о том, что запись была обновлена

![изображение](https://github.com/user-attachments/assets/f69ba849-4a4d-4c5b-a9c5-0ef282dbba3e)

при нажатии кнопки `создать отчет`, то происходит переход на форму создания отчета, в котором инженер может выбрать дату и формат отчета

![изображение](https://github.com/user-attachments/assets/ec8d1b7b-fb42-4709-bb52-46941ea0a0ca)

если ошибок нет, то скачивается документ `engineer-performed-works`

![изображение](https://github.com/user-attachments/assets/f6a902e8-367a-4cda-bc18-e1c5077e77f1)

если поля заполнены некорректно, то ошибки

![изображение](https://github.com/user-attachments/assets/baf2a527-b845-4b9b-8674-09d973220c5a)

#### Страница "запланированные проверки"

внешний вид

![изображение](https://github.com/user-attachments/assets/d9c44bee-668a-482c-9586-383661f4f7fd)

фильтрация

![изображение](https://github.com/user-attachments/assets/c3c2f8a9-1104-4bd9-9b7e-b5ce97bd6e56)

ошибка, если данные не найдены

![изображение](https://github.com/user-attachments/assets/17f16fab-f37f-4dee-8186-cb1c9bef8f04)

если при отправке уведомления, инженер находится на сайте, то приходит уведомление

![изображение](https://github.com/user-attachments/assets/c6c1bf8e-e8c9-475d-bbcd-7fc4fd5a04a6)

в остальных случаях приходит сообщение на почту всем инженерам

![изображение](https://github.com/user-attachments/assets/a251e9ce-76aa-4b02-adda-1e93221b79c8)

#### Страница "самолеты"

внешний вид

![изображение](https://github.com/user-attachments/assets/d88edf91-782f-42fc-ac9a-3c670a2defab)

поиск по серийному номеру

![изображение](https://github.com/user-attachments/assets/76871eed-0988-4bd0-84c7-17e2bf9aadd1)

ошибка

![изображение](https://github.com/user-attachments/assets/dbd0a786-99e9-4ee9-b863-54904977e403)

### Главный инженер

#### Страница "запланированные проверки"

внешнй вид

![изображение](https://github.com/user-attachments/assets/b7177ed0-4659-4dc5-9c5a-98c0b85fa13a)

если нажать кнопку `добавить`, то открывается страница для добавления выполненной работы

![изображение](https://github.com/user-attachments/assets/c21152ac-1d19-4b1a-b3f3-f792afd9748d)

если данные введены корректно, то происходит переход на страницу "запланированные проверки" и выводится сообщение, что проверка была добавлена

каждый час отправляется сообщения о всех плановых проверках, если не было отправки сообщения

![изображение](https://github.com/user-attachments/assets/d0446d99-7a65-4f48-b6b5-5f1a2b06f884)

возможные ошибки

![изображение](https://github.com/user-attachments/assets/7ffe9302-79d1-4b83-82e9-607ff5514475)

при изменении можно поменять только время и стату проверки

![изображение](https://github.com/user-attachments/assets/78a114f8-efa5-4d2c-9b14-1dfd7289f8c8)

#### Страница "выполненные работы"

здесь выводятся все выполненные работы у всех инженеров, а также их ID

![изображение](https://github.com/user-attachments/assets/bfd65602-f390-4f99-a2a7-3c46cd6adbe2)

если нажать кнопку `создать отчет`, то открывается форма для создания отчета, где можно создать отчет по всем выполненным работам у конкретного самолета за определенны период

![изображение](https://github.com/user-attachments/assets/b2a72869-8be3-4d7b-a770-045cf85803f0)

![изображение](https://github.com/user-attachments/assets/987a0426-1a4f-4d1e-ab39-9aab6dcaa2d7)

все ошибки продуманы

![изображение](https://github.com/user-attachments/assets/e9fc0caa-a47f-4675-9a1c-edb72b867be3)



#### Страница "самолеты"

такая же как и у инженера
