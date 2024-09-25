"use client";
import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DigitalClockComponent() {
const [time,setTime]=useState<Date>(new Date())
const [is24hour,setIs24hour]=useState<boolean>(true)
const [mounted,setMounted]=useState<boolean>(false)

useEffect(()=>{
    setMounted(true)
    const interval=setInterval(() => {
        setTime(new Date())
    }, 1000);
    return ()=>clearInterval(interval)
},[])

const formattedTime=useMemo<string>(()=>{
    if(!mounted) return ""
    const hours=is24hour?
    time.getHours().toString().padStart(2,"0"):
    (time.getHours()%12||12).toString().padStart(2,"0")
    const minutes=time.getMinutes().toString().padStart(2,"0")
    const seconds=time.getSeconds().toString().padStart(2,"0")
    return `${hours} : ${minutes} : ${seconds}`
},[time,is24hour,mounted])


return(
    <>
    <div className="flex justify-center items-center h-screen">
        <Card className="p-8 shadow-lg rounded-lg">
           
<h1 className="text-center font-bold text-4xl">Digital clock</h1>
<p className="text-gray-500">Display current time in hours, minutes and seconds</p>
<h1 className="text-5xl font-bold text-center mt-4">{formattedTime}</h1>
<div className="flex space-x-3 justify-around mt-3">
    <Button variant={is24hour?"default":"outline" } className="font-bold" onClick={()=>{setIs24hour(true)}}>24-hour Format</Button>
    <Button variant={!is24hour?"default":"outline" } className="font-bold"onClick={()=>{setIs24hour(false)}}>12-hour Format</Button>
</div>

        </Card>
    </div>
    </>
)





}