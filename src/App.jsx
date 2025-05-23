import { useEffect, useState } from "react";
import "./App.css";
import initializeNestedMaps from "./utils/initializeNestedMaps";
import initializeNestedArrayMaps from "./utils/initializeNestedArrayMaps";
import initializeNestedData from "./utils/initializeNestedData";
import isValidCharacter from "./utils/isValidCharacter";
import updateLetterData from "./utils/updateLetterData";
import ChartHolder from "./components/ChartHolder";
import beeMovieText from "./assets/beeMovieScript.txt?raw";
import viginereCipher from "./assets/ViginereCipher";

//import {letterFrequency} from './Data.js'

function App() {
  const [letterData, setLetterData] = useState(new Map());
  const [sortedLetterMap, setSortedLetterMap] = useState([]);
  const [keyNumber, setKeyNumber] = useState();
  const [counter, setCounter] = useState();
  const [graphData, setGraphData] = useState();
  const [components, setComponents] = useState();
  const [example, setExample] = useState("");
  const [exampleNum, setExampleNum] = useState();

  const updateKeyNum = () => {
    let currNum = parseInt(
      document.getElementById("keylength-input").value,
      10
    );
    setKeyNumber(currNum);
    setLetterData(initializeNestedMaps(currNum));
    setSortedLetterMap(initializeNestedArrayMaps(currNum));
    setGraphData(initializeNestedData(currNum));
    setCounter(0);
  };

  const readText = () => {
    console.log("reading text");
    let innerCount = counter;
    let textToAdd = document.getElementById("ciphertext-input").value;
    //console.log('textToAdd: ', textToAdd)
    for (let i = 0; i < textToAdd.length; i++) {
      if (!isValidCharacter(textToAdd[i])) {
        continue;
      }
      //console.log('past valid character block')
      for (let j = 1; j < keyNumber + 1; j++) {
        //console.log('j: ', j, 'innerCount: ', innerCount, ' innerCount % j + 1: ', (innerCount % j) + 1, 'letter: ', textToAdd[i] )
        updateLetterData({
          setLetterData,
          outerKey: j,
          innerKey: (innerCount % j) + 1,
          letter: textToAdd[i],
        });
      }
      //console.log('Finished adding text, incrementing counter')
      innerCount++;
    }

    setCounter(innerCount);
  };

  useEffect(() => {
    console.log("updatedKeyNumber", keyNumber);
  }, [keyNumber]);

  useEffect(() => {
    console.log("Finished Reading text");
    console.log("updatedKeyNumber", keyNumber);
    console.log("letterData: ", letterData);
    console.log("sortedLetterMap: ", sortedLetterMap);
    console.log("counter: ", counter);
    if (counter != 0) {
      for (let i = 1; i < keyNumber + 1; i++) {
        const innerMap = letterData.get(i);
        for (let j = 1; j < i + 1; j++) {
          const letterDataArray = Array.from(innerMap.get(j));
          letterDataArray.sort((a, b) => b[1] - a[1]);
          setSortedLetterMap((prevMap) => {
            const newArrayMap = new Map(prevMap);
            //console.log('newArrayMap: ', newArrayMap)
            const outerArrayMap = newArrayMap.get(i);
            //console.log('outerArrayMap: ', outerArrayMap)
            outerArrayMap.set(j, letterDataArray);
            return newArrayMap;
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  useEffect(() => {
    console.log("Updated Sorted Letter Map: ", sortedLetterMap);
    if (counter != 0) {
      for (let i = 1; i < keyNumber + 1; i++) {
        const innerMap = sortedLetterMap.get(i);
        for (let j = 1; j < i + 1; j++) {
          const sortedLetterData = innerMap.get(j);
          setGraphData((prevData) => {
            const newGraphMap = new Map(prevData);
            //console.log('newGraphMap: ', newGraphMap)
            const outerMap = newGraphMap.get(i);
            const cutLetterData = sortedLetterData.slice(0, 8);
            const tempData = {
              labels: cutLetterData.map((letter) => letter[0]),
              datasets: [
                {
                  label: "Frequency",
                  data: cutLetterData.map((freq) => freq[1]),
                  backgroundColor: "rgb(0, 255, 0)",
                },
              ],
            };
            //console.log('outerMap: ', outerMap)
            outerMap.set(j, tempData);
            return newGraphMap;
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedLetterMap]);

  useEffect(() => {
    console.log("graphData: ", graphData);

    const newComps = [];

    if (counter != 0) {
      for (let i = 1; i < keyNumber + 1; i++) {
        const ourMap = graphData.get(i);
        newComps[i] = [];
        const innerVec = newComps[i];
        innerVec.push(<ChartHolder key={i} mapPtr={ourMap} size={i} />);
      }

      setComponents(newComps);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphData]);

  const handleExample = () => {
    setExample(viginereCipher(beeMovieText, "filmscript"));
    setExampleNum(11);
  };

  return (
    <div className="bg-black min-h-screen h-full w-full flex items-center justify-center text-gray-200 overflow-y-auto ">
      <div className="flex flex-col flex-grow items-center">
        <h1 className="text-green-500 text-9xl animate-fadeInSlide mb-5 pt-8 font-hacker">
          Viginere Cipher
        </h1>
        <h1 className="text-green-500 text-9xl animate-fadeInSlide mb-5 pt-8 font-hacker">
          Frequency Analysis
        </h1>
        <div className="flex flex-row items-center">
          <div className="flex flex-col flex-grow items-center">
            <div className="flex flex-row items-center mb-5">
              <input
                type="number"
                className="text-green-500 border-2 border-green-500 bg-gray-900 rounded-lg appearance-none 
                    font-hacker text-xl
                    placeholder:font-hacker placeholder:text-gray-600 placeholder:pl-1
                    mt-5 pl-2 min-w-[200px]"
                placeholder="Potential Key Lengths"
                id="keylength-input"
                value={exampleNum}
              ></input>
              <button
                className="mr-5 bg-green-500 p-4 text-black text-2xl font-hacker ml-5"
                onClick={updateKeyNum}
              >
                Confirm Key Length
              </button>
            </div>
            <h2 className="font-hacker text-lg text-green-500">
              Warning: Updating your number of keys will delete your previous
              input ciphertext data
            </h2>
            <textarea
              id="ciphertext-input"
              className="min-h-[300px] min-w-[600px] overflow-y-scroll
                    text-xl text-green-500 font-hacker bg-gray-900 rounded-lg border-2 border-green-500
                    placeholder:font-hacker placeholder:text-gray-700 placeholder:pl-2
                    pl-2 mt-5
                    scrollbar-track-black scrollbar-thumb-green-500 scrollbar-thumb-rounded scrollbar-thin scrollbar-track-rounded"
              placeholder="Ciphertext"
              value={example}
            ></textarea>
            <div>
              <button
                className=" bg-green-500 p-4 text-black mt-5 font-hacker text-2xl mr-5"
                onClick={readText}
              >
                Analyze
              </button>
              <button
                className=" bg-green-500 p-4 text-black mt-5 font-hacker text-2xl ml-5"
                onClick={handleExample}
              >
                Example
              </button>
            </div>
          </div>
          <div className="border border-green-500 rounded-lg ml-20 p-5 w-[700px] overflow-auto break-words ">
            <h1 className="text-center text-green-500 text-3xl font-hacker">
              How frequency analysis works
            </h1>
            <div className="space-y-4">
              <p>
                In a normal Caesar cipher, we can use frequency analysis to
                determine the shift value used.
              </p>
              <p>
                It is known that E is the most commonly used letter in the
                english alphabet, so with enough input, we can correlate the
                most common letter to E and determine the shift value off of
                that.
              </p>
              <p>
                However, a Viginere cipher works a bit differently. There is a
                key used that can be more than one character long, and this adds
                a lot of variance to how letters are distributed
              </p>
              <p>
                Standard frequency analysis will not work here as we can't
                account for the changing shift value. To account for this, we
                can assume different values of key lengths and run frequency
                analysis on each character in the key. That way, with enough
                input, we come up with keys of various lengths and find which
                one gives us the desired plaintext!
              </p>
              <p>
                So with this analyzer, you input your desired ciphertext you
                want to decrypt and your best guess at what the key length might
                be. It will then generate tables below showing the frequency of
                each letter at each character index and form the corresponding
                key with said key length.
              </p>
              <p>
                Keys can often be some kind of word or phrase related to the
                plaintext so look for keys that form anything recognizable. For
                an example, I used the entire script to the bee movie encrypted
                with the key "filmscript" and set the key lengths to 11 so you
                can see the analyzers guesses to keys as you increase the
                length. Just click example, confirm the key length, and click
                analyze!
              </p>
            </div>
          </div>
        </div>
        <div>{components}</div>
      </div>
    </div>
  );
}

//<BarChart chartData={} />

export default App;
