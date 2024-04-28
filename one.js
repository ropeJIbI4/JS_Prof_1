"use strict";

/*
###Задание 1
Создайте обычный объект "Музыкальная коллекция", который можно итерировать. 
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция 
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
  title: "Название альбома",
  artist: "Исполнитель",
  year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и 
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/


class MusicCollection {
        albums = [
            {
                title: 'Не бойся, я с тобой!',
                artist: 'Руки Вверх!',
                year: 2001
            },
            {
                title: 'Гуляй, мужик!',
                artist: 'Сектор Газа',
                year: 1996
            },
            {
                title: 'Ночь короче дня',
                artist: 'Ария',
                year: 1995
            }
        ];
  

    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.albums.length) {
                    let album = this.albums[index];
                    index++;
                    return { value: album, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
}

let collection = new MusicCollection();
for (let album of collection) {
    console.log(`${album.title} - ${album.artist} (${album.year})`);
}