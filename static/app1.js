class Chatbox {
  constructor() {
    this.args = {
      openButton: document.querySelector(".chatbox__button"),
      chatBox: document.querySelector(".chatbox__support"),
      sendButton: document.querySelector(".send__button"),
    };

    this.state = false;
    this.messages = [];
    this.btn = [
      "Internet is not working",
      "Slow Internet",
      "Router is broken",
      // "MNNIT WIFI IS Not Showing",
    ];
    this.txt = "Tell Me what issue are you facing??";
    this.html = "";
    this.map1 = new Map();
  }

  display() {
    const { openButton, chatBox, sendButton } = this.args;

    openButton.addEventListener("click", () => {
      // this.displaySuggestions(chatBox);
      this.toggleState(chatBox);
    });

    sendButton.addEventListener("click", () => this.onSendButton(chatBox));

    const node = chatBox.querySelector("input");
    node.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        this.onSendButton(chatBox);
      }
    });
  }

  class = "X";

  // displaySuggestions(chatbox) {
  //   const suggestions = [
  //     "My internet is not working",
  //     "Why is my internet slow?",
  //     "How can I improve internet speed?",
  //   ];

  //   const suggestionDiv = document.createElement("div");
  //   suggestionDiv.classList.add("suggestion__container");

  //   suggestions.forEach((suggestion) => {
  //     const button = document.createElement("button");
  //     button.classList.add("suggestion__button");
  //     button.textContent = suggestion;

  //     button.addEventListener("click", () => {
  //       this.removeSuggestions(chatbox);
  //       this.onSendButton(chatbox, suggestion);
  //     });

  //     suggestionDiv.appendChild(button);
  //   });

  //   chatbox.appendChild(suggestionDiv);
  // }

  // removeSuggestions(chatbox) {
  //   const suggestionDiv = chatbox.querySelector(".suggestion__container");
  //   chatbox.removeChild(suggestionDiv);
  // }

  toggleState(chatbox) {
    this.state = !this.state;

    // show or hides the box
    if (this.state) {
      chatbox.classList.add("chatbox--active");
      chatbox.querySelector(".chatbox__messages").innerHTML = "";
      // console.log("hello12")
      this.starter(this.map1);

      // remove existing event listeners from buttons
      const buttons = chatbox.querySelectorAll("#X");
      buttons.forEach((button) => {
        button.removeEventListener("click", button.clickHandler);
      });

      this.fun1(this.btn, this.txt, chatbox);
    } else {
      chatbox.classList.remove("chatbox--active");
      this.messages = [];
    }
  }

  onSendButton(chatbox, suggestion = null) {
    var textField = chatbox.querySelector("input");
    let text1 = textField.value;
    if (text1 === "Yes" || text1 === "yes" || text1 === "YES") {
      let msg1 = { name: "User", message: text1 };
      this.messages.push(msg1);
    }

    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: JSON.stringify({ message: text1 }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        const msg2 = { name: "Sam", message: r.answer };
        this.messages.push(msg2);
        this.updateChatText(chatbox);
        textField.value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
        this.updateChatText(chatbox);
        textField.value = "";
      });
  }

  updateChatText(chatbox) {
    let html = "";
    console.log(this.messages);

    this.messages
      .slice()
      .reverse()
      .forEach(({ name, message }) => {
        const className = name === "Sam" ? "visitor" : "operator";
        html += `<div class="messages__item messages__item--${className}">${message}</div>`;
      });
    // const n = this.messages.length();
    // let text = messages[n - 1].message;
    // console.log(text);

    //     html += `<div >
    //     <div style="display: flex;flex-direction: column;width: fit-content; border-radius:5px;border: 1px solid gray;padding: 4px";>
    //     <centre><h6>Tell Me the Issue You are facing </h6></centre>
    //     <button style="margin: 2px;border-radius: 20px;" type="button" class="btn btn-light">Internet is not working</button>
    //     <button style="margin: 2px;border-radius: 20px;" type="button" class="btn btn-light">speed is slow</button>
    //     <button style="margin: 2px;border-radius: 20px;" type="button" class="btn btn-light">etc.</button>
    //     <button  style="margin: 2px;border-radius: 20px;" type="button" class="btn btn-light">etc.</button>
    // </div>
    // </div>`;

    const chatmessage = chatbox.querySelector(".chatbox__messages");
    chatmessage.innerHTML = html;
  }

  fun1(btn, txt, chatbox) {
    // Execute the first line and wait for it to complete before proceeding



    this.messages.push({
      name: "Sam",
      message: txt,
    });

    // // Execute the second line and wait for it to complete before proceeding

    this.updateChatText(chatbox);

    // Execute the remaining code
    let html = chatbox.querySelector(".chatbox__messages").innerHTML;
    let tmp = html;
    let temp = html;
    temp =
      `<div style=margin:2px;>
      <div class="baby" id="Y"; style=" display: flex;flex-direction: column;  border-radius:5px ;padding: 4px; align-items:left; width: fit-content;background:transparent;">
      
      </div>
      </div>` + tmp;

    html = temp;
    chatbox.querySelector(".chatbox__messages").innerHTML = html;

    let tt = chatbox.querySelector(".baby").innerHTML;
    console.log(tt);

    btn
      .slice()
      .reverse()
      .forEach((text) => {
        tt += ` <button id="X"; style="margin: 2px;border-radius: 20px; background-color:#d7f7f7;width:fit-content" type="button" class="btn btn-light" onMouseOver="this.style.backgroundColor='#e4ebeb'" onMouseOut="this.style.backgroundColor='#d7f7f7'">${text}</button>`;
      });

    chatbox.querySelector(".baby").innerHTML = tt;
    const buttons = chatbox.querySelectorAll("#X");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const text = button.textContent;

        this.messages.push({
          name: "user",
          message: text,
        });
        // console.log(this.messages);
        this.updateChatText(chatbox);

        
 
        let obj = this.fn(text, this.map1, chatbox);
        console.log(obj);
        if (obj) {

          // console.log();
          let typing=`<img style="border-radius:40px;" width="50vh" height="50vh" src="../static/typing.gif" />`;
          typing+=chatbox.querySelector(".chatbox__messages").innerHTML;
          chatbox.querySelector(".chatbox__messages").innerHTML=typing;
          

          
          
          setTimeout(() => {
            this.fun1(obj.button, obj.response, chatbox);
          }, 2000);
        }
        
      });
    });
  }

  starter(map1) {
    console.log("hello1");

    map1.set("MNNIT WIFI IS Not Showing", {
      response:
        "1)Setting kro <br>2) Advance setting kro <br>3) network reset ",
      button: ["Still Not Working", "Yeah I Got the internet"],
    });

    // console.log(map1);

    map1.set("MNNIT WIFI IS Not Showing", {
      response:
        "1)Setting kro <br>2) Advance setting kro <br>3) network reset ",
      button: ["Still Not Working", "Yeah I Got the internet"],
    });

    map1.set("Yeah I Got the internet", { response: "Thank you", button: [] });

    map1.set("Go to Main Menu", {
      response: "Tell Me what issue are you facing??<br>",
      button: [
        "Internet is not working",
        "Slow Internet",
        "Router is broken",
        // "MNNIT WIFI IS Not Showing",
      ],
    });

    map1.set("Slow Internet", {
      response:
        "Try switching among following proxies <br>1) 172.31.102.14<br>2) 172.31.102.29<br>3) 172.31.102.17 <br> PORT : 3128 ",
      button: ["Still Not Working", "Yeah I Got the internet"],
    });

    map1.set("Wifi Not Working in Neighbour", {
      response:
        "1)It is not Issue with your system <br>2) It is the issue with the MNNIT wifi <br>3) Wait for some time <br>4) Try Contacting Tecnhician <br>5) Technician Number: abcdefghijh  ",
      button: ["Issues Not Resolved , Want To Register Complaint"],
    });

    map1.set("Still Not Working", {
      response:
        "1)Try Contacting Tecnhician <br>2) Technician Number: abcdefghijh",
      button: ["Issues Not Resolved , Want To Register Complaint"],
    });

    map1.set("Router is broken", {
      response:
        "1)Try Contacting Technician <br>2) Technician Number: abcdefghijh",
      button: ["Issues Not Resolved , Want To Register Complaint"],
    });

    map1.set("Internet is not working", {
      response:
        "1)Consider these basic steps <br>2) Check Internet is working in Neigbhouring Room <br>3) Wifi or LAN is properly connected <br>4) Check for Proxy setting in your system <br>5) Try any of the following proxy <br>6) 172.31.100.1, 172.31.102.29, 172.31.100.27 with Port 3128 ",
      button: [
        "Wifi Not Working in Neighbour",
        "MNNIT WIFI Is not Showing",
        "I have checked for all above options and still not working",
      ],
    });

    map1.set("I have checked for all above options and still not working", {
      response: "Select your computer OS",
      button: ["Windows", "MAC OS", "Linux"],
    });
    map1.set("MNNIT WIFI Is not Showing", {
      response:
        "1)Go to Computer Setting <br>2) Select Network Settings <br>3) Go to Advance Network Settings <br> 4) Network Reset <br> 5) Now Check Again ",
      button: ["Still Not Working", "Yeah I Got the internet"],
    });

    map1.set("Windows", {
      response:
        "1) Try Ping to check for Internet <br>2) Open command Prompt <br>3) Write ping 172.31.100.1 <br> 4) Press Enter <br>",
      button: [
        "Packets are being send and still not working",
        "Destination host Unreachable",
      ],
    });
    map1.set("Linux", {
      response:
        "1) Try Ping to check for Internet <br>2) Open command Prompt <br>3) Write ping 172.31.100.1 <br> 4) Press Enter <br>",
      button: [
        "Packets are being send and still not working",
        "Destination host Unreachable",
      ],
    });
    map1.set("MAC OS", {
      response:
        "1) Try Ping to check for Internet <br>2) Open command Prompt <br>3) Write ping 172.31.100.1 <br> 4) Press Enter <br>",
      button: [
        "Packets are being send and still not working",
        "Destination host Unreachable",
      ],
    });

    map1.set("Packets are being send and still not working", {
      response:
        "1)Try Contacting Technician <br>2) Technician Number: abcdefghijh",
      button: ["Go to Main Menu"],
    });
    map1.set("Destination host Unreachable", {
      response: "Select Below Options",
      button: ["are you using LAN", "are you using WIFI"],
    });

    map1.set("are you using WIFI", {
      response:
        "1) Open command Promt <br>2) Write inetcpl.cpl and press Enter<br> 3) Pop up shows up and select 'Connections' section in nav bar <br> 4) Select LAN Setting below <br> 5) check Proxy Server and set default IP Address and Port <br> 6) Try any of the following proxy <br>7) 172.31.100.1, 172.31.102.29, 172.31.100.27 with Port 3128 <br>8) Press Enter <br>9) Refresh and check for Internet",
      button: ["Still Not Working", "Yeah I Got the internet"],
    });

    map1.set("are you using LAN", {
      response:
        "1) Open command Promt <br>2) Write inetcpl.cpl and press Enter<br> 3) Pop up shows up and select 'Connections' section in nav bar <br> 4) Select LAN Setting below <br> 5) check Proxy Server and set default IP Address and Port <br> 6) Try any of the following proxy <br>7) 172.31.100.1, 172.31.102.29, 172.31.100.27 with Port 3128 <br>8) Press Enter <br>9) Refresh and check for Internet",
      button: ["Still Not Working", "Yeah I Got the internet"],
    });

    map1.set("Issues Not Resolved , Want To Register Complaint", {
      response: "Your Complaint is register succesfully",
      button: [],
    });

    // map1.set("MNNIT WIFI Is Not Showing", {response:"1)Try Contacting Technician <br>2) Technician Number: abcdefghijh",button:["Go to Main Menu"]});
  }




   fn  (text, map1, chatbox)  {
    if (text == "Issues Not Resolved , Want To Register Complaint") {

    
      let html = chatbox.querySelector(".chatbox__messages").innerHTML;
      let tmp = html;
      let temp = html;

      setTimeout(() => {

        temp =
        `<div class="outer" style=margin:2px;>
        <div class="baby" ; style=" display: flex;flex-direction: column;  border-radius:5px ;padding: 4px; align-items:left; width: fit-content;background:transparent;">
        
        </div>
        </div>` + tmp;
  
      html = temp;
      chatbox.querySelector(".chatbox__messages").innerHTML = html;
  
      let tt = chatbox.querySelector(".baby").innerHTML;
      console.log(tt);
  
      tt += ` <textarea  style="border:0.5px solid gray;border-radius:20px;margin:5px"  id="w3review" name="w3review" rows="4" cols="50">
      </textarea>`;
  
      tt += ` <button id="Z"; style="margin: 2px;border-radius: 20px; background-color:#7da6e8;width:fit-content" type="button" class="btn btn-light" onMouseOver="this.style.backgroundColor='#e4ebeb'" onMouseOut="this.style.backgroundColor='#7da6e8'">Submit</button>`;
  
      chatbox.querySelector(".baby").innerHTML = tt;

      const btn = chatbox.querySelector("#Z");
      btn.addEventListener("click", () => {
        //Backend me hume text area ka content bhejna he then  or agr vo complaint succesfully register ho jati he tb or agr complaint succesfuuly register hoti he to ek tocken id generatee hogi vo hume display karana he
  
        
        console.log("hello Sachin");
  
        const tokenid="2432434343254";
  
        
  
        console.log(this.messages);
  
        this.messages.push({
          name: "Sam",
          message:
            `Your complaint has register sucessfully 👍<br>Token id : ${tokenid} <br> You Can Check Status of your Compalint from Website using this token id .`,
        });
        this.messages.push({ name: "Sam", message: "Thanku Have A Nice Day 😊" });
  
        this.updateChatText(chatbox);
  
       
      });



        
      }, 2000);
     
      
    } else {
      let obj = {};
  
      obj = map1.get(text);
      // console.log(obj);
      return obj;
    }
  };


}



const chatbox = new Chatbox();
chatbox.display();

///buuton click
// fn 1 - responsse
// response -fn - design
