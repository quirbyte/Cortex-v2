const option1 = { month: "short", day: "numeric", year: "numeric" } as const;
const option2 = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' } as const;

export function formatDate({date,option}:{date: string,option : number}) {
  if(option===1){
    const formattedDate = new Date(date).toLocaleDateString("en-US", option1);
    return formattedDate;
  }else if(option===2){
    const formattedDate = new Date(date).toLocaleDateString('en-GB', option2);
    return formattedDate;
  }
}
