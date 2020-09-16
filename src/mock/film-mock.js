import {getRandomInteger, getRandomArray, getRandomArrayElement, getRandomDate} from "../utils/common.js";
import {EMOTIONS} from "../constants";


const DIRECTORS = [`Anthony Mann`, `David Lynch`, `Jim Jarmusch`, `Stanley Kubrick`, `Steven Spielberg`, `Alfred Hitchcock`];
const COUNTRIES = [`USA`, `Russia`, `Italy`, `Germany`, `France`];
const ACTORS = [
  `Amy Adams`,
  `Jason Isaacs`,
  `Jennifer Aniston`,
  `Ben Affleck`,
  `Casey Affleck`,
  `Antonio Banderas`,
  `Javier Bardem`,
  `Gerard Butler`,
  `Elizabeth Banks`,
  `Sean Bean`,
  `Cate blanchett`,
  `Orlando Bloom`,
  `Jack Black`,
  `Fedor Bondarchuk`,
  `Josh Brolin`,
  `Steve Buscemi`,
  `Christian Bale`,
  `Jason Bateman`,
];
const GENRES = [`Western`, ` Musical`, `Comedy`, `Cartoon`, `Drama`];

// const getRandomTime = () => {
//   const hours = getRandomInteger(0, 2);
//   const minutes = getRandomInteger(0, 60);
//   return `${hours ? hours + `h ` : ``}${minutes ? minutes + `m ` : ``}`;
// };

const POSTERS_SRC = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];
const NAMES = [
  `Sagebrush Trail`,
  `The Dance of Life`,
  `Santa Claus Conquers the Martians`,
  `The Man with the Golden Arm`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
];
const WRITERS = [`Anne Wigton`, `Heinz Herald`, `Richard Weil`];
// const name = getRandomArrayElement(NAMES);

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit, amet consectetur adipisicing elit. `,
  `Mollitia necessitatibus voluptas in? `,
  `Sint provident itaque placeat, autem voluptatem corporis laborum minus excepturi, unde cupiditate nostrum voluptatum dolorum fugiat?`,
  `Odio odit debitis repellat exercitationem quas? `,
  `Totam ad accusantium quam, officiis accusamus voluptas. `,
  `Possimus maiores reprehenderit dolorem quisquam nisi pariatur ipsa expedita atque minima est, eligendi dolorum, at, quis perspiciatis!`,
  `Tempore quam quasi porro ad? Sunt, eveniet aliquam. `,
  `Consequuntur vero debitis nobis, voluptate fuga ipsa facere animi saepe exercitationem aliquid, omnis unde architecto distinctio harum. Reprehenderit illo quasi nisi magnam?`,

  `Libero in quis adipisci aut accusamus ipsam delectus at tempora, magni culpa porro earum inventore! `,
  `Doloribus magnam debitis aliquam, voluptate perferendis necessitatibus soluta, dolores obcaecati placeat earum ipsam, corrupti totam.`,
  `Omnis aut sunt expedita dolore repellat sit eos. Dolorum, eius dolor. `,
  `Suscipit nobis facere numquam ea aut obcaecati delectus soluta, laudantium dolore veritatis quibusdam. `,
  `Reprehenderit est nemo praesentium iure corporis!`,
  `Doloremque eveniet provident impedit excepturi, ipsum deserunt sit debitis hic, natus dolor odio iusto suscipit.`,
  `Nemo consectetur impedit pariatur earum itaque! `,
  `Quasi, pariatur repellat exercitationem optio corrupti sunt officia maiores quod, neque molestiae quos praesentium delectus quisquam ipsum reprehenderit hic iusto nostrum voluptatibus at odit.`,
  `Minima, laboriosam temporibus. `,
  `Ullam mollitia debitis facilis dicta quis atque eveniet excepturi eos dolor numquam molestiae molestias ratione rerum voluptate, et voluptatum odit nulla deserunt dignissimos voluptates sit? `,
  `Doloribus, commodi.`,
  `Ut, veniam. `,
  `Provident quidem vitae quam nobis quaerat tempore quisquam dolores illum veritatis consequuntur, animi ducimus expedita dignissimos reprehenderit impedit dolor nemo. `,
  `Omnis iusto cupiditate cumque ab iure, numquam dicta?`,
];
const getDescription = (length) => {
  const description = getRandomArray(DESCRIPTIONS, length);
  return description.join(` `);
};

const getDate = () => {
  const day = getRandomInteger(1, 31);
  const year = getRandomInteger(1920, 2020);
  const month = getRandomInteger(0, 11);
  // return [day, month, year];
  return new Date(year, month, day);
};


const createComment = () => {
  return {
    id: Date.now(),
    text: getDescription(2),
    emotion: getRandomArrayElement(EMOTIONS),
    author: getRandomArrayElement([`Tim Macoveev`, `John Doe`, `Vasya`, `Natalya1998`, `Solntse`]),
    date: getRandomDate(new Date(2012, 0, 1), new Date()),
    isDelete: false,
  };
};
const COMMENTS_COUNT = 5;
let a = 1;
const getId = () => {
  a++;
  // console.log(id);
  return a;
};


export const createFilm = ()=> {
  const name = getRandomArrayElement(NAMES);
  const date = getDate();
  const comments = new Array(getRandomInteger(1, COMMENTS_COUNT)).fill().map((it)=> {
    it = createComment();
    return it;
  });


  return {
    id: getId(),
    poster: getRandomArrayElement(POSTERS_SRC),
    name,
    originalName: name,
    rating: (getRandomInteger(10, 100) / 10),
    director: getRandomArrayElement(DIRECTORS),
    writers: Array.from(new Set(getRandomArray(WRITERS, 5))),
    actors: Array.from(new Set(getRandomArray(ACTORS, 10))),

    releaseDate: date,
    runtime: getRandomInteger(40, 170),
    country: getRandomArrayElement(COUNTRIES),
    genres: Array.from(new Set(getRandomArray(GENRES, 5))),

    description: getDescription(5),
    // commentsCount: getRandomInteger(0, 1000),
    comments: Array.from(new Set(comments)),
    old: getRandomInteger(5, 18),
    isWatched: Math.random() >= 0.5,
    isInWatchlist: Math.random() >= 0.5,
    isFavorite: Math.random() >= 0.5
  };
};
