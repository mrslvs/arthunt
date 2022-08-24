'use strict';

const crypto = require('crypto');

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

    constructor(name, author, type, imageURL, height, width){
        this.#name = name;
        this.#author = author;
        this.#type = type;
        this.#imageURL = imageURL;
        this.#image = this.#getImagePath();
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

    #createCode(){
        return crypto.randomUUID().slice(-5);
    }

    isCodeCorrect(code){
        if(code === this.#code){
            return true;
        }else{
            return false;
        }
    }

    #getImagePath(){
        return this.#imageURL.slice(this.#imageURL.lastIndexOf('/') + 1);
    }

    // TO-DO:
    //   1. add found information
    //   2. remove found information

}

module.exports = ArtItem;