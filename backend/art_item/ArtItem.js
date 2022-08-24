'use strict';

class ArtItem {
    #name;
    #author;
    #type;
    #imageSource;
    #height;
    #width;
    #searchPhrase;
    #code;
    #found;

    constructor(name, author, type, imageSource, height, width){
        this.#name = name;
        this.#author = author;
        this.#type = type;
        this.#imageSource = imageSource;
        this.#height = height;
        this.#width = width;
        this.#searchPhrase = '404 NOT FOUND';
        this.#code = this.#createCode();
        this.#found = false;
    }
    
    // ==== GETERS ====

    getName(){
        return this.#name;
    }

    getAuthor(){
        return this.#author;
    }

    getType(){
        return this.#type;
    }

    getImageSource(){
        return this.#imageSource;
    }

    getHeight(){
        return this.#height;
    }

    getWidth(){
        return this.#width;
    }

    getSearchPhrase(){
        return this.#searchPhrase;
    }

    getCode(){
        return this.#code;
    }
    
    getFound(){
        return this.#found;
    }

    // ==== SETTERS ====

    setName(name){
        this.#name = name
    }

    setAuthor(author){
        this.#author = author;
    }

    setType(type){
        this.#type = type;
    }

    setImageSource(imgSrc){
        this.#imageSource = imgSrc;
    }

    setHeight(height){
        this.#height = height;
    }

    setWidth(width){
        this.#width = width;
    }

    setSearchPhrase(searchPhrase){
        this.#searchPhrase = searchPhrase;
    }
    
    setCode(code){
        this.#code = code;
    }
    
    toggleFound(){
        this.#found = !this.#found;
    }
    
    // ==== METHODS ====

    #createCode(){
        return crypto.randomUUID().slice(-5);
    }

    // TO-DO:
    //   1. found information
    //   2. remove found information

}

module.exports = ArtItem;