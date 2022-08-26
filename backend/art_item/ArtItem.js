'use strict';

class ArtItem {
    #name;
    #author;
    #type;
    #imageURL;
    #image;
    #height;
    #width;
    #searchPhrase;
    #code;
    #found;

    constructor(name, author, type, imageURL, image, height, width, code){
        this.#name = name;
        this.#author = author;
        this.#type = type;
        this.#imageURL = imageURL;
        this.#image = image;
        this.#height = height;
        this.#width = width;
        this.#searchPhrase = '';
        this.#code = code;
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

    getImageURL(){
        return this.#imageURL;
    }

    getImage(){
        return this.#image;
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

    setImageURL(imgSrc){
        this.#imageURL = imgSrc;
    }

    setImage(imgPath){
        this.#image = imgPath;
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

    isCodeCorrect(code){
        if(code === this.#code){
            return true;
        }else{
            return false;
        }
    }
    
    persistQueryValues(){
        return `
            '${this.#name}', 
            '${this.#author}', 
            '${this.#type}', 
            '${this.#imageURL}', 
            '${this.#image}', 
            ${this.#height}, 
            ${this.#width}, 
            '${this.#searchPhrase}', 
            '${this.#code}', 
            ${this.#found}
        `
    }
}

module.exports = ArtItem;