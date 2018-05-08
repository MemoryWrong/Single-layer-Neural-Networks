export default class NeuralNetwork{
    constructor(){
        //training set. [length, width, color(0=blue and 1=red)]
        var dataB1 = [1, 1, 0];
        var dataB2 = [2, 1,   0];
        // var dataB3 = [2, .5, 0];
        // var dataB4 = [3,   1, 0];
        var dataB3 = [2, 6.5, 0];
        var dataB4 = [3,   8, 0];

        var dataR1 = [3, 5.5, 1];
        var dataR2 = [3.5,   6.5, 1];
        // var dataR1 = [3, 1.5, 1];
        // var dataR2 = [3.5,   .5, 1];
        var dataR3 = [4, 1.5, 1];
        var dataR4 = [5.5,   1,   1];

        //unknown type (data we want to find)
        var dataU = [4.5,  1, "it should be 1"];

        this.blue =[dataB1, dataB2, dataB3, dataB4];
        this.red =[dataR1, dataR2, dataR3, dataR4];

        this.all_points = [dataB1, dataB2, dataB3, dataB4, dataR1, dataR2, dataR3, dataR4];
        // this.input = this.all_points;

    }
    
    calWeights(input){
        // let sum = 0;
        // for(let i =0; i<input.length; i++){
        //     sum+=input[i]*(Math.random*2-1);
        // }
        // return sum;

    }

    sigmoid(sum){
        let result = 1/(1 + Math.exp(-sum));
        return result;
    }

    train(){

        /**
         * return the parameter w1, w2, ..., wn, B => Bias parameter...
         * and parameters will changed after one iteration of learning inclduing 10000 times of loop 
         */
        let w1 = Math.random()*2-1;
        let w2 = Math.random()*2-1;
        let b = Math.random()*2-1;
        /**
         * the learning rate is Delta value to adjust parameter???
         */
        let learning_rate = 0.05;

        /**
         * 1.pick one sample of the data list => all_points;
         * 2.random_point => calWeight SUM => get Sigmoid value 1~0 get result
         * 3.adjust w1, w2, b parameter...
         */

        for(let i=0; i<50000; i++){
            //get a random point
            let p_index = Math.floor(Math.random()*8);
            let p_random = this.all_points[p_index];
            let p_target = this.all_points[p_index][2];

            //now do cal weights for the point
            let sum = w1*p_random[0]+w2*p_random[1]+b;

            //now cal predictive result using sigmoid function
            let pre_result = this.sigmoid(sum);

            //compare with the correct answer....
            //if the result is incorrect, change parameters...
            let cost = (pre_result-p_target)**2;
            //求导函数
            let d_cost = 2*(pre_result-p_target);

            // bring derivative through sigmoid
            //同样的 对于 sigmoid 函数求导函数
            // derivative of sigmoid can be written using more sigmoids! d/dz sigmoid(z) = sigmoid(z)*(1-sigmoid(z))
            let dpred_dz = this.sigmoid(sum) * (1-this.sigmoid(sum));

            let dz_dw1 = p_random[0];
            let dz_dw2 = p_random[1];
            let dz_db = 1;
    
            // now we can get the partial derivatives using the chain rule
            // notice the pattern? We're bringing how the cost changes through each function, first through the square, then through the sigmoid
            // and finally whatever is multiplying our parameter of interest becomes the last part
            let dcost_dw1 = d_cost * dpred_dz * dz_dw1;
            let dcost_dw2 = d_cost * dpred_dz * dz_dw2;
            let dcost_db =  d_cost * dpred_dz * dz_db;
    
            // now we update our parameters!
            w1 -= learning_rate * dcost_dw1;
            w2 -= learning_rate * dcost_dw2;
            b -= learning_rate * dcost_db;

        }
        return {w1: w1, w2: w2, b: b};
    }
}