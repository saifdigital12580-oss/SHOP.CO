import React, { useEffect, useState } from "react";

import {
PieChart,
Pie,
Cell,
ResponsiveContainer,
Tooltip,
Legend,
} from "recharts";

const COLORS = [
"#6366F1",
"#EC4899",
"#22C55E",
"#F97316",
"#06B6D4",
"#A855F7",
"#EAB308",
];

const DashboardCategoryChart = () => {

const [data,setData]=useState([]);

useEffect(()=>{

fetchChart();

},[]);

const fetchChart=async()=>{

const response=await fetch(
"https://sk-store-theta.vercel.app/dashboard/category-analytics"
);

const result=await response.json();

if(result.success){

setData(
result.categories.map((item)=>({

name:item._id,

value:item.total,

}))

);

}

};

return(

<div
className="analyticsbox1"
>

<h2
style={{marginBottom:"20px"}}
>

Category Distribution

</h2>

<ResponsiveContainer
width="100%"
height={330}
>

<PieChart>

<Pie

data={data}

dataKey="value"

nameKey="name"

outerRadius={120}

label

>

{

data.map((entry,index)=>(

<Cell

key={index}

fill={
COLORS[index%COLORS.length]
}

/>

))

}

</Pie>

<Tooltip/>

<Legend/>

</PieChart>

</ResponsiveContainer>

</div>

);

};

export default DashboardCategoryChart;