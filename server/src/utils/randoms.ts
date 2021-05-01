export const randomTo = (counter: number, to: number) : Array<number> => {
   if(counter > to) return [];
   let arr = [];
   while(arr.length < counter) {
      let rndNum = Math.floor( Math.random() * (to - 1 + 1) ) + 1;
      if(!arr.includes(rndNum)) arr.push(rndNum);
      else continue;
   }
   return arr.map(item => item-1);
}