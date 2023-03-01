const cards = document.querySelectorAll(".card");

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard= 0;

function flipCard (e){
    let clickedCard = e.target // getting user clicked Card
    

    if(clickedCard !== cardOne && !disableDeck){
        clickedCard.classList.add("flip");
        if(!cardOne){
            // return the cardOne value to  clickedCard

            return cardOne =clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        
        let cardOneImg = cardOne.querySelector("img").src, 
        cardTwoImg =cardTwo.querySelector("img").src;

        matchCards(cardOneImg, cardTwoImg );

    }


}


function matchCards(img1, img2 ){
    if(img1 === img2){ // if two cards img matched
        matchedCard++; //increment matched value by 1
        //if matched value is 8 that means user has matched all the cards (8*2 = 16 cards)
        
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; //setting  both card value to blank

        if (matchedCard == 8){
            setTimeout(()=>{
                return shuffleCard();
            },1000); //calling shuffleCrad function after 1 second

        }
        
        return  disableDeck = false;
    }
    //if two cards not matched
    setTimeout(()=>{
        //adding shake class to both card after 400ms
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    },400);

    setTimeout(()=>{
        //removing both shake and flip classes to both card after 400ms 1.2 s
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = ""; //setting  both card value to blank
        disableDeck = false;
    },1200)

}


function shuffleCard(){
    matchedCard= 0;
    cardOne = cardTwo = ""; //setting  both card value to blank
    disableDeck = false;
    //creating array of 16 items and each item is repeated twice
    let array = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    array.sort(()=> Math.random() > 0.5 ? 1 : -1); // sorting array item randomly


    //removing flip class from all cards and passing random image to each card
    cards.forEach ((card, i)=>{ 
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/img-${array[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();


cards.forEach (card=>{ //adding click event to all cards
    // card.classList.add("flip");
    card.addEventListener("click", flipCard);
});