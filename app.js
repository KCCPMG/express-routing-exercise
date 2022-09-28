const express = require('express');


const app = express();

const checkInput = (numArr) => {
  if (!numArr) {
    return {
      passes: false,
      message: `No numbers given`
    }
  }
  for (let num of numArr) {
    try {

      if (isNaN(Number(num))) {
        console.log(`Inside checkInput failure on ${num}`)
        return {
          passes: false,
          message: `${num} is not a number`
        }
      }

    } catch(e) {
      return {
        passes: false,
        message: `${num} is not a number`
      }
    }
  } 
  numArr = numArr.map(n => Number(n))
  return {
    passes: true,
    numArr: numArr
  }
}

const getMean = (numArr) => {
  console.log(numArr);
  console.log(typeof(numArr));
  console.log(typeof(numArr[0]))
  return (numArr.reduce((a,b) => a+b, 0) / numArr.length)
}

const getMedian = (numArr) => {
  let sortedArr = numArr.sort((a,b) => a-b);
  if (numArr.length % 2 == 1) {
    return sortedArr[(numArr.length / 2) - 0.5]
  } else {
    return getMean(sortedArr.slice((numArr.length / 2) - 1, (numArr.length / 2) + 1))
  }
}

const getMode = (numArr) => {
  let numCount = {};
  for (let num of numArr) {
    if (Object.keys(numCount).includes(String(num))) {
      numCount[num]++;
    } else {
      numCount[num] = 1;
    }
  }


  let firstKey = Object.keys(numCount)[0]

  let highest = {number: firstKey, count: numCount[firstKey]};
  let modeBool = true;

  for (let key of Object.keys(numCount).slice(1)) {
    if (numCount[key] > highest.count) {
      modeBool = true;
      highest.number = key;
      highest.count = numCount[key]
    } else if (numCount[key] == highest.count) {
      modeBool = false;
    }
  }

  if (modeBool) return highest.number
  else return "No mode"

}



app.get('/mean', (req, res) => {
  
  if (!req.query.nums) {
    return res.status(400).json(`Error: No numbers provided`)
  }
  
  // else
  let numbers = req.query.nums.split(",");
  
  check = checkInput(numbers);
  if (check.passes) {
    res.json({
      operation: 'mean',
      value: `${getMean(check.numArr)}`
    })
  } else {
    res.status(400).json(`Error: ${check.message}`)
  }

  console.log(req.query.nums)
  
})


app.get('/median', (req, res) => {
  
  if (!req.query.nums) {
    return res.status(400).json(`Error: No numbers provided`)
  }
  
  // else
  let numbers = req.query.nums.split(",");
  
  check = checkInput(numbers);
  if (check.passes) {
    res.json({
      operation: "median",
      value: `${getMedian(check.numArr)}`
    })
  } else {
    res.status(400).json(`Error: ${check.message}`)
  }

  console.log(req.query.nums)
})


app.get('/mode', (req, res) => {

  if (!req.query.nums) {
    return res.status(400).json(`Error: No numbers provided`)
  }
  
  // else
  let numbers = req.query.nums.split(",");
  
  check = checkInput(numbers);
  if (check.passes) {
    res.json({
      operation: "mode",
      value: `${getMode(check.numArr)}`
    })
  } else {
    res.status(400).json(`Error: ${check.message}`)
  }

  console.log(req.query.nums)
})


app.listen('3000', () => {
  console.log("listening on port 3000");
})

