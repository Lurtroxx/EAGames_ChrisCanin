export const shuffle = (array) =>
    [...Array(array.length)]
        .map((el, i) => Math.floor(Math.random() * i))
        .reduce((a, rv, i) => ([a[i], a[rv]] = [a[rv], a[i]]) && a, array)
