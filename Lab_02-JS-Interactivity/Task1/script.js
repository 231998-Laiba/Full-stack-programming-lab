// answers stored in variables
let ans1 = "islamabad";
let ans2 = "10";
let ans3 = "yellow";

// check quiz
function checkAnswers(){
    let score = 0;

    let q1 = document.getElementById("q1").value.toLowerCase();
    let q2 = document.getElementById("q2").value;
    let q3 = document.getElementById("q3").value.toLowerCase();

    if(q1 === ans1) score++;
    if(q2 === ans2) score++;
    if(q3 === ans3) score++;

    let message="";

    if(score==3){
        message="Excellent! ";
    }
    else if(score==2){
        message="Good Job ";
    }
    else{
        message="Try Again ";
    }

    document.getElementById("result").innerHTML =
    "Your Score: "+score+"/3 <br>"+message;
}

// reset quiz
function resetQuiz(){
    document.getElementById("q1").value="";
    document.getElementById("q2").value="";
    document.getElementById("q3").value="";
    document.getElementById("result").innerHTML="";
}
