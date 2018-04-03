import * as bcrypt from "bcrypt";
import * as merge from "./merge";

// REMOVE OR REWORK THESE FUNCTIONS---------------------------------
// want to remove req, but session.regenerate doesn't return promise
function regenerateSession(req) {
  return new Promise (
    (resolve, reject) => {
      req.session.regenerate(function(err) {
        if (err) reject(err)
        else resolve();
      })
    }
  )
}

// could latch on to the error event
function dbError(res:ModResponse, thisPage:string, err:string) {
  res.render(thisPage, { dbError: dbErrTranslator(err)});
}

function genError(res:ModResponse, thisPage:string, param:Error | string) {
  res.render(thisPage, { dbError: param } );
}
// REMOVE OR REWORK THESE FUNCTIONS---------------------------------



function compare(a:Alarm, b:Alarm) {
  const awakeA = parseInt(a.awake);
  const awakeB = parseInt(b.awake);

  let comp = 0;
  if (awakeA > awakeB) {
    comp = 1;
  } else if (awakeB > awakeA) {
    comp = -1;
  }
  return comp;
}

const randomString = new Promise(
  (resolve, reject) => {
    let string = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+-=`,.<>/?;:'{}[]|";
    for (let i = 0; i <= 40; i++) {
      string += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    if (typeof string === "undefined") {
      reject("randomString failed to create anything ")
    }
    resolve(string);
  }
)

const isSessionValid = (token, outputs) => {
  return new Promise(
    (resolve, reject) => {
      const nonce = outputs.nonce;
      const oldDate = new Date(outputs.thetime);
      const oldTime = oldDate.getTime();
      const currentDate = new Date();
      const currentTime = currentDate.getTime();

      if (token === nonce && currentTime < oldTime + 120000) {
        resolve(true);
      } else {
        const failure = new Error("Token has expired, please try again.");
        reject(failure);
      }
    },
  );
};

const merger = (objectOne, objectTwo) => {
  return new Promise(
    (resolve, reject) => {
      let ans = merge.deepMerge(objectOne, objectTwo);
      if (ans === "circular object") {
        let failure = new Error("Circular object")
        reject(failure);
      } else {
        resolve(ans);
      }
    }
  )
}

function lastFourOnly(cardNumber:string) {
  const arr = [];
  
  cardNumber = cardNumber.split("");
  for (let i = cardNumber.length; arr.length < 5; i-- ) {
    arr.push(cardNumber[i]);
   }

 arr.reverse();
 return arr.join("")
}

// COULD GENERALIZE THIS FUNCTION: ADD KEY/VALUE(S) PAIR TO OBJCT
function addOrderUUIDItemNumber(queryResult, order_uuid) {
  for (let i = 0; i < queryResult.length; i++) {
    queryResult[i].order_uuid = order_uuid;
    queryResult[i].item_number = i + 1;
  }
  return queryResult;
}

const orgName = "United Nations Childrens Fund";

function idMaker(name: string) {
  name = name.toLowerCase();
  const arrName = name.split("");
  for (let i = 0; i < arrName.length; i++) {
    if (arrName[i] === " ") {
      arrName[i] = "-";
    }
  }
  return arrName.join("");
}

export {
  dbErrTranslator,
  dbError,
  genError,
  compare,
  randomString,
  isSessionValid,
  regenerateSession,
  lastFourOnly,
  addOrderUUIDItemNumber,
  merger,
  idMaker,
};
