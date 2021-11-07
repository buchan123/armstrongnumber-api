const express = require("express");

const app = express();

app.get("/api/:num", (req, res) => {
  try {
    const startTime = Date.now();
    const startMemory = process.memoryUsage().heapUsed / 1024;

    let len = req.params.num.length;
    let num = parseInt(req.params.num);
    let sum = 0;
    let isArmstrong = false;
    while (num > 0) {
      let digit = num % 10;
      sum += Math.pow(digit, len);
      num = parseInt(num / 10);
    }
    if (sum === parseInt(req.params.num)) {
      isArmstrong = true;
    }

    let isLowArmstrong = false;
    let lowArmstrong;
    let isHighArmstrong = false;
    let highArmstrong;
    if (!isArmstrong) {
      for (let i = parseInt(req.params.num); i >= 1; i--) {
        let lenOfNum = i.toString().length;
        let temp = i;
        let sumOfNum = 0;
        while (temp > 0) {
          let digit = temp % 10;
          sumOfNum += Math.pow(digit, lenOfNum);
          temp = parseInt(temp / 10);
        }

        if (sumOfNum === i) {
          isLowArmstrong = true;
          lowArmstrong = i;
          break;
        }
      }

      for (
        let i = parseInt(req.params.num) + 1;
        i < Number.MAX_SAFE_INTEGER;
        i++
      ) {
        let lenOfNum = i.toString().length;
        let temp = i;
        let sumOfNum = 0;
        while (temp > 0) {
          let digit = temp % 10;
          sumOfNum += Math.pow(digit, lenOfNum);
          temp = parseInt(temp / 10);
        }

        if (sumOfNum === i) {
          isHighArmstrong = true;
          highArmstrong = i;
          break;
        }
      }
    }

    const endTime = Date.now();
    const endMemory = process.memoryUsage().heapUsed / 1024;

    const resObj = {
      number: parseInt(req.params.num),
      isArmstrong,
      timeTaken: `${endTime - startTime} milliseconds`,
      memoryUsage: `${Math.round((endMemory - startMemory) * 100) / 100} KB.`,
      lowArmstrong: isLowArmstrong ? lowArmstrong : undefined,
      highArmstrong: isHighArmstrong ? highArmstrong : undefined,
    };

    return res.status(200).json(resObj);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

app.listen(3000, () => {
  console.log("Server Started.");
});
