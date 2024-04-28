"use strict";
/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.

Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк
*/

// Посетитель ресторана.
class Client {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

// Вам необходимо реализовать класс, который управляет заказами и поварами.

class Manager {
  constructor() {
    this.chefs = {
      "Пицца": "Олег",
      "Суши": "Андрей",
      "Десерт": "Анна"
    };
    this.dishes = new Map([
      ["Пицца", ["Маргарита", "Пепперони", "Три сыра"]],
      ["Суши", ["Филадельфия", "Калифорния", "Чизмаки", "Сеякемаки"]],
      ["Десерт", ["Тирамису", "Чизкейк"]]
    ]);
    this.orders = new Map();
  }

  newOrder(client, ...dishes) {
    if (!this.orders.has(client)) {
      this.orders.set(client, new Map());
    }

    const clientOrder = this.orders.get(client);

    dishes.forEach(dish => {
      const dishType = Array.from(this.dishes.keys()).find(type => this.dishes.get(type).includes(dish.name));
      if (dishType) {
        if (!clientOrder.has(dishType)) {
          clientOrder.set(dishType, new Map());
        }
        if (!clientOrder.get(dishType).has(dish.name)) {
          clientOrder.get(dishType).set(dish.name, 0);
        }
        clientOrder.get(dishType).set(dish.name, clientOrder.get(dishType).get(dish.name) + dish.quantity);
      } else {
        console.log(`Ошибка: "${dish.type}" "${dish.name}" не существует.`);
        throw new Error(`"${dish.type}""${dish.name}" не существует.`);
      }
    });

    this.orders.set(client, clientOrder);

    console.log(`Клиент ${client.firstname} заказал:`);
    for (let [dishType, dishes] of clientOrder) {
      for (let [dish, quantity] of dishes) {
        console.log(`${dish} - ${quantity}; готовит повар ${this.chefs[dishType]}`);
      }
    }
  }
}

// Можно передать внутрь конструктора что-либо, если необходимо.

const manager = new Manager();

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.

manager.newOrder(
  new Client("Иван", "Иванов"), 
  { name: "Маргарита", quantity: 1, type: "Пицца" },
  { name: "Пепперони", quantity: 2, type: "Пицца" },
  { name: "Чизкейк", quantity: 1, type: "Десерт" },
);
// Вывод:
// Клиент Иван заказал: 
// Пицца "Маргарита" - 1; готовит повар Олег
// Пицца "Пепперони" - 2; готовит повар Олег
// Десерт "Чизкейк" - 1; готовит повар Анна

// ---

const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
  clientPavel, 
  { name: "Филадельфия", quantity: 5, type: "Суши" },
  { name: "Калифорния", quantity: 3, type: "Суши" },
);

// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

manager.newOrder(
  clientPavel, 
  { name: "Калифорния", quantity: 1, type: "Суши" },
  { name: "Тирамису", quantity: 2, type: "Десерт" },
);

// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна

manager.newOrder(
  clientPavel, 
  { name: "Филадельфия", quantity: 1, type: "Суши" },
  { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" },
);

// Ничего не должно быть добавлено, должна быть выброшена ошибка:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.