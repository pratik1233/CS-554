const md5 = require('blueimp-md5');

const publickey = '950d62580db1e75625ee7276138f02a8';
const privatekey = '0ebf7eb02cf69c05ebf14b1156ef91b65f35488a';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);


const charactersCheck = (limit,offset) =>{
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters?limit='+limit+'&offset='+offset;
    const url = baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
    return url;
}

const charactersId = (id) =>{
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/' + id;
    const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
    return url;
}

const charactersSearch = (nameStartsWith) =>{
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters?nameStartsWith='+nameStartsWith;
    const url = baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
    return url;
}

const comics = (limit,offset) =>{
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics?limit='+limit+'&offset='+offset;;
    const url = baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
    return url;
}

const comicsId = (id) =>{
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics/' + id;
    const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
    return url;
}

const comicsSearch = (titleStartsWith) =>{
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics?titleStartsWith='+titleStartsWith;
    const url = baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
    return url;
}

const series = (limit,offset) =>{
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/series?limit='+limit+'&offset='+offset;
    const url = baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
    return url;
}

const seriesId = (id) =>{
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/series/' + id;
    const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
    return url;
}

const seriesSearch = (titleStartsWith) =>{
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/series?titleStartsWith='+titleStartsWith;
    const url = baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
    return url;
}



export { charactersId,comics,comicsId,series,seriesId,charactersCheck,charactersSearch,comicsSearch,seriesSearch};