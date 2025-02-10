"use client";

import CreateTask from "@/components/tabs/createTask";
import Search from "@/components/tabs/search";
import Today from "@/components/tabs/today";
import Charts from '@/components/tabs/Charts'
import React, { useState } from "react"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function page() {

  const router = useRouter()

  const [userInformation, setUserInformation] = useState(false)
  const [newCategory, setNewCategory] = useState(false)
  const [activeTab, setActiveTab] = useState<React.ReactElement>()

  const parentHandelBack = (e: unknown) => {
    if (!e) {
      setActiveTab(undefined);
    }
  };

  const token = localStorage.getItem('token')

  if(!token){
    router.push('/login')
  }


  async function logout(event:React.MouseEvent<HTMLButtonElement>) {
    const response = await fetch(('https://todo.zmat24.ir/api/logout'), {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Provider: "JYozs70KBkJJmNsmPJIjiRdKmmPd3f",
          Authorization : `Bearer ${token}`
      },
  })

  if (response.ok) {
    router.push('/login');
    localStorage.clear();
    toast.loading('لطفا چند لحطه صبر کن بفرستمت بیرون :(' , {duration : 3000})
  }else{
    console.log('خطایی داریم :(');
    
  }

  }

  return (
    <div className="font-pelak flex justify-start items-start">
      <label onClick={() => setUserInformation(false)} className={` ${userInformation ? "block" : "hidden"} w-dvw z-10 top-0 left-0  h-dvh absolute opacity-60 bg-black`}>close</label>
      <div className="bg-[#f8f8f8c6] min-w-80 min-h-screen">
        <div onClick={(() => setUserInformation(true))} className="flex justify-start p-2 hover:cursor-pointer relative items-center gap-1">
          <img className="w-14 h-14 bg-slate-300 rounded-full" src="#" alt="" />
          <p className="text-lg">امیرحسین برفر</p>
          <svg className={`${userInformation ? 'rotate-180' : ""} transform`} width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 9.17C16.8126 8.98375 16.5592 8.87921 16.295 8.87921C16.0308 8.87921 15.7774 8.98375 15.59 9.17L12 12.71L8.46001 9.17C8.27265 8.98375 8.0192 8.87921 7.75501 8.87921C7.49082 8.87921 7.23737 8.98375 7.05001 9.17C6.95628 9.26297 6.88189 9.37357 6.83112 9.49543C6.78035 9.61729 6.75421 9.74799 6.75421 9.88C6.75421 10.012 6.78035 10.1427 6.83112 10.2646C6.88189 10.3864 6.95628 10.497 7.05001 10.59L11.29 14.83C11.383 14.9237 11.4936 14.9981 11.6154 15.0489C11.7373 15.0997 11.868 15.1258 12 15.1258C12.132 15.1258 12.2627 15.0997 12.3846 15.0489C12.5064 14.9981 12.617 14.9237 12.71 14.83L17 10.59C17.0937 10.497 17.1681 10.3864 17.2189 10.2646C17.2697 10.1427 17.2958 10.012 17.2958 9.88C17.2958 9.74799 17.2697 9.61729 17.2189 9.49543C17.1681 9.37357 17.0937 9.26297 17 9.17Z" fill="black" /></svg>
        </div>
        {userInformation &&
          <div className='duration-300 ease-in-out z-20 transform w-96 h-[430px] bg-white border-2 p-4 shadow-xl rounded-lg right-5 absolute top-24'>
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-lg text-center"> اطلاعات کاربری</h1>
              <svg onClick={() => setUserInformation(false)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">  <g clipPath="url(#clip0_28_60)">    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#323232" />  </g>  <defs>    <clipPath id="clip0_28_60">      <rect width="24" height="24" fill="white" />    </clipPath>  </defs></svg>
            </div>
            <form action="" className="flex justify-start items-center flex-col gap-2">
              <label htmlFor="profileImg">
                <img className="rounded-full shadow size-24" src="/images/logo.png" />
              </label>
              <input id="profileImg" className="hidden" type="file" required />
              <input className="w-full p-2 h-11 rounded-lg border-[#ddd] border-2 input input-sm" type="text" required placeholder="تغییر اسم :" />
              <input className="w-full p-2 h-11 rounded-lg border-[#ddd] border-2 input input-sm" type="email" required placeholder="تغییر ایمیل :" />
              <input className="w-full p-2 h-11 rounded-lg border-[#ddd] border-2 input input-sm" type="password" required placeholder="تغییر رمز عبور :" />
              <button className="w-full h-11 bg-blue-500 rounded-lg text-white">ثبت تغییرات</button>
            </form>
              <button onClick={logout} className="w-full h-11 bg-red-500 rounded-lg text-white">خروج از حساب کاربری</button>
          </div>
        }
        <div className="mt-10 p-2 flex justify-start items-start flex-col gap-5 text-lg">
          <div onClick={() => setActiveTab(<CreateTask handelBack={(e: unknown) => parentHandelBack(e)} />)} className="flex justify-start items-center gap-1 cursor-pointer">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_28_109)">  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z" fill="#FF2C2C" /></g><defs>  <clipPath id="clip0_28_109"><rect width="24" height="24" fill="white" /></clipPath></defs></svg>
            <h2>اضافه کردن تسک جدید</h2>
          </div>
          <div onClick={() => setActiveTab(<Search handelBack={(e: unknown) => parentHandelBack(e)} />)} className="flex justify-start items-center gap-1 cursor-pointer">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_2_862)"><path d="M9.49 15.5L9.49 14.71L9.76 14.43C10.9 15.41 12.38 16 13.99 16C17.58 16 20.49 13.09 20.49 9.5C20.49 5.91 17.58 3 13.99 3C10.4 3 7.49 5.91 7.49 9.5C7.49 11.11 8.08 12.59 9.06 13.73L8.78 14L7.99 14L3 19L4.49 20.49L9.49 15.5ZM9.49 9.5C9.49 7.01 11.5 5 13.99 5C16.48 5 18.49 7.01 18.49 9.5C18.49 11.99 16.48 14 13.99 14C11.5 14 9.49 11.99 9.49 9.5Z" fill="black" /></g><defs><clipPath id="clip0_2_862"><rect width="24" height="24" fill="white" /></clipPath></defs></svg>
            <h2>جستجو</h2>
          </div>
          <div onClick={() => setActiveTab(<Today />)} id="programToday" className="flex justify-start items-center gap-1 cursor-pointer">
            <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 4.33332H17V3.24999C17 2.96267 16.8946 2.68712 16.7071 2.48396C16.5196 2.28079 16.2652 2.16666 16 2.16666C15.7348 2.16666 15.4804 2.28079 15.2929 2.48396C15.1054 2.68712 15 2.96267 15 3.24999V4.33332H9V3.24999C9 2.96267 8.89464 2.68712 8.70711 2.48396C8.51957 2.28079 8.26522 2.16666 8 2.16666C7.73478 2.16666 7.48043 2.28079 7.29289 2.48396C7.10536 2.68712 7 2.96267 7 3.24999V4.33332H5C4.20435 4.33332 3.44129 4.67573 2.87868 5.28523C2.31607 5.89472 2 6.72137 2 7.58332V20.5833C2 21.4453 2.31607 22.2719 2.87868 22.8814C3.44129 23.4909 4.20435 23.8333 5 23.8333H19C19.7956 23.8333 20.5587 23.4909 21.1213 22.8814C21.6839 22.2719 22 21.4453 22 20.5833V7.58332C22 6.72137 21.6839 5.89472 21.1213 5.28523C20.5587 4.67573 19.7956 4.33332 19 4.33332ZM20 20.5833C20 20.8706 19.8946 21.1462 19.7071 21.3494C19.5196 21.5525 19.2652 21.6667 19 21.6667H5C4.73478 21.6667 4.48043 21.5525 4.29289 21.3494C4.10536 21.1462 4 20.8706 4 20.5833V13H20V20.5833ZM20 10.8333H4V7.58332C4 7.29601 4.10536 7.02046 4.29289 6.81729C4.48043 6.61413 4.73478 6.49999 5 6.49999H7V7.58332C7 7.87064 7.10536 8.14619 7.29289 8.34936C7.48043 8.55252 7.73478 8.66666 8 8.66666C8.26522 8.66666 8.51957 8.55252 8.70711 8.34936C8.89464 8.14619 9 7.87064 9 7.58332V6.49999H15V7.58332C15 7.87064 15.1054 8.14619 15.2929 8.34936C15.4804 8.55252 15.7348 8.66666 16 8.66666C16.2652 8.66666 16.5196 8.55252 16.7071 8.34936C16.8946 8.14619 17 7.87064 17 7.58332V6.49999H19C19.2652 6.49999 19.5196 6.61413 19.7071 6.81729C19.8946 7.02046 20 7.29601 20 7.58332V10.8333Z" fill="black" /><mask id="path-2-outside-1_0_1" maskUnits="userSpaceOnUse" x="6" y="13" width="12" height="7" fill="black"><rect fill="white" x="6" y="13" width="12" height="7" /><path d="M7.13672 19V18.5312H8.93555V14.9746L7.25684 15.5342L7.07812 15.1006L8.89453 14.5H9.49805V18.5312H11.0684V19H7.13672ZM12.1934 17.9131C12.1934 17.6514 12.2178 17.4316 12.2666 17.2539C12.3154 17.0762 12.4092 16.9336 12.5479 16.8262C12.6865 16.7188 12.8877 16.6416 13.1514 16.5947C13.417 16.5459 13.7646 16.5205 14.1943 16.5186H15.2432C15.5479 16.5186 15.7852 16.5088 15.9551 16.4893C16.127 16.4678 16.252 16.4287 16.3301 16.3721C16.4082 16.3135 16.4561 16.2295 16.4736 16.1201C16.4932 16.0088 16.5029 15.8633 16.5029 15.6836C16.5029 15.4961 16.4854 15.3486 16.4502 15.2412C16.415 15.1338 16.3457 15.0557 16.2422 15.0068C16.1387 14.958 15.9854 14.9268 15.7822 14.9131C15.5811 14.8994 15.3135 14.8926 14.9795 14.8926H14.3408C13.9912 14.8926 13.7109 14.8994 13.5 14.9131C13.291 14.9268 13.1328 14.958 13.0254 15.0068C12.918 15.0557 12.8457 15.1338 12.8086 15.2412C12.7734 15.3486 12.7559 15.4961 12.7559 15.6836H12.1934C12.1934 15.4277 12.2217 15.2168 12.2783 15.0508C12.3369 14.8848 12.4414 14.7549 12.5918 14.6611C12.7441 14.5674 12.959 14.502 13.2363 14.4648C13.5137 14.4258 13.8721 14.4062 14.3115 14.4062H15.0088C15.4326 14.4062 15.7793 14.4258 16.0488 14.4648C16.3184 14.502 16.5264 14.5674 16.6729 14.6611C16.8213 14.7549 16.9238 14.8848 16.9805 15.0508C17.0371 15.2168 17.0654 15.4277 17.0654 15.6836C17.0654 16.0117 17.0215 16.2715 16.9336 16.4629C16.8477 16.6523 16.6953 16.7881 16.4766 16.8701C16.2598 16.9502 15.9531 16.9902 15.5566 16.9902H14.2676C13.918 16.9902 13.6416 17.002 13.4385 17.0254C13.2354 17.0488 13.085 17.0938 12.9873 17.1602C12.8896 17.2246 12.8262 17.3174 12.7969 17.4385C12.7695 17.5596 12.7559 17.7178 12.7559 17.9131V18.5312H16.8867V19H12.1934V17.9131Z" /></mask><path d="M7.13672 19V18.5312H8.93555V14.9746L7.25684 15.5342L7.07812 15.1006L8.89453 14.5H9.49805V18.5312H11.0684V19H7.13672ZM12.1934 17.9131C12.1934 17.6514 12.2178 17.4316 12.2666 17.2539C12.3154 17.0762 12.4092 16.9336 12.5479 16.8262C12.6865 16.7188 12.8877 16.6416 13.1514 16.5947C13.417 16.5459 13.7646 16.5205 14.1943 16.5186H15.2432C15.5479 16.5186 15.7852 16.5088 15.9551 16.4893C16.127 16.4678 16.252 16.4287 16.3301 16.3721C16.4082 16.3135 16.4561 16.2295 16.4736 16.1201C16.4932 16.0088 16.5029 15.8633 16.5029 15.6836C16.5029 15.4961 16.4854 15.3486 16.4502 15.2412C16.415 15.1338 16.3457 15.0557 16.2422 15.0068C16.1387 14.958 15.9854 14.9268 15.7822 14.9131C15.5811 14.8994 15.3135 14.8926 14.9795 14.8926H14.3408C13.9912 14.8926 13.7109 14.8994 13.5 14.9131C13.291 14.9268 13.1328 14.958 13.0254 15.0068C12.918 15.0557 12.8457 15.1338 12.8086 15.2412C12.7734 15.3486 12.7559 15.4961 12.7559 15.6836H12.1934C12.1934 15.4277 12.2217 15.2168 12.2783 15.0508C12.3369 14.8848 12.4414 14.7549 12.5918 14.6611C12.7441 14.5674 12.959 14.502 13.2363 14.4648C13.5137 14.4258 13.8721 14.4062 14.3115 14.4062H15.0088C15.4326 14.4062 15.7793 14.4258 16.0488 14.4648C16.3184 14.502 16.5264 14.5674 16.6729 14.6611C16.8213 14.7549 16.9238 14.8848 16.9805 15.0508C17.0371 15.2168 17.0654 15.4277 17.0654 15.6836C17.0654 16.0117 17.0215 16.2715 16.9336 16.4629C16.8477 16.6523 16.6953 16.7881 16.4766 16.8701C16.2598 16.9502 15.9531 16.9902 15.5566 16.9902H14.2676C13.918 16.9902 13.6416 17.002 13.4385 17.0254C13.2354 17.0488 13.085 17.0938 12.9873 17.1602C12.8896 17.2246 12.8262 17.3174 12.7969 17.4385C12.7695 17.5596 12.7559 17.7178 12.7559 17.9131V18.5312H16.8867V19H12.1934V17.9131Z" fill="black" /><path d="M7.13672 19H6.63672V19.5H7.13672V19ZM7.13672 18.5312V18.0312H6.63672V18.5312H7.13672ZM8.93555 18.5312V19.0312H9.43555V18.5312H8.93555ZM8.93555 14.9746H9.43555V14.2809L8.77743 14.5003L8.93555 14.9746ZM7.25684 15.5342L6.79456 15.7247L6.97235 16.1561L7.41495 16.0085L7.25684 15.5342ZM7.07812 15.1006L6.92116 14.6259L6.41116 14.7945L6.61585 15.2911L7.07812 15.1006ZM8.89453 14.5V14H8.81401L8.73757 14.0253L8.89453 14.5ZM9.49805 14.5H9.99805V14H9.49805V14.5ZM9.49805 18.5312H8.99805V19.0312H9.49805V18.5312ZM11.0684 18.5312H11.5684V18.0312H11.0684V18.5312ZM11.0684 19V19.5H11.5684V19H11.0684ZM7.63672 19V18.5312H6.63672V19H7.63672ZM7.13672 19.0312H8.93555V18.0312H7.13672V19.0312ZM9.43555 18.5312V14.9746H8.43555V18.5312H9.43555ZM8.77743 14.5003L7.09872 15.0598L7.41495 16.0085L9.09366 15.449L8.77743 14.5003ZM7.71911 15.3436L7.5404 14.9101L6.61585 15.2911L6.79456 15.7247L7.71911 15.3436ZM7.23509 15.5753L9.0515 14.9747L8.73757 14.0253L6.92116 14.6259L7.23509 15.5753ZM8.89453 15H9.49805V14H8.89453V15ZM8.99805 14.5V18.5312H9.99805V14.5H8.99805ZM9.49805 19.0312H11.0684V18.0312H9.49805V19.0312ZM10.5684 18.5312V19H11.5684V18.5312H10.5684ZM11.0684 18.5H7.13672V19.5H11.0684V18.5ZM13.1514 16.5947L13.2389 17.087L13.2418 17.0865L13.1514 16.5947ZM14.1943 16.5186V16.0185L14.1921 16.0186L14.1943 16.5186ZM15.9551 16.4893L16.0122 16.986L16.0171 16.9854L15.9551 16.4893ZM16.3301 16.3721L16.6236 16.7769L16.6301 16.7721L16.3301 16.3721ZM16.4736 16.1201L15.9811 16.0337L15.98 16.0408L16.4736 16.1201ZM15.7822 14.9131L15.7483 15.4119L15.7486 15.412L15.7822 14.9131ZM13.5 14.9131L13.4677 14.4141L13.4674 14.4142L13.5 14.9131ZM12.8086 15.2412L12.3359 15.0779L12.3334 15.0857L12.8086 15.2412ZM12.7559 15.6836V16.1836H13.2559V15.6836H12.7559ZM12.1934 15.6836H11.6934V16.1836H12.1934V15.6836ZM12.2783 15.0508L11.8068 14.8844L11.8051 14.8893L12.2783 15.0508ZM12.5918 14.6611L12.3297 14.2353L12.3273 14.2368L12.5918 14.6611ZM13.2363 14.4648L13.3026 14.9604L13.3061 14.96L13.2363 14.4648ZM16.0488 14.4648L15.9771 14.9597L15.9806 14.9602L16.0488 14.4648ZM16.6729 14.6611L16.4033 15.0823L16.4059 15.0839L16.6729 14.6611ZM16.9336 16.4629L16.4792 16.2542L16.4782 16.2563L16.9336 16.4629ZM16.4766 16.8701L16.6498 17.3391L16.6521 17.3383L16.4766 16.8701ZM12.9873 17.1602L13.2628 17.5775L13.2685 17.5736L12.9873 17.1602ZM12.7969 17.4385L12.3108 17.3209L12.3092 17.3283L12.7969 17.4385ZM12.7559 18.5312H12.2559V19.0312H12.7559V18.5312ZM16.8867 18.5312H17.3867V18.0312H16.8867V18.5312ZM16.8867 19V19.5H17.3867V19H16.8867ZM12.1934 19H11.6934V19.5H12.1934V19ZM12.6934 17.9131C12.6934 17.679 12.7156 17.5071 12.7487 17.3864L11.7845 17.1215C11.72 17.3562 11.6934 17.6237 11.6934 17.9131H12.6934ZM12.7487 17.3864C12.7705 17.3073 12.8054 17.2591 12.8541 17.2214L12.2417 16.4309C12.0129 16.6081 11.8604 16.845 11.7845 17.1215L12.7487 17.3864ZM12.8541 17.2214C12.9038 17.1829 13.0166 17.1265 13.2389 17.087L13.0639 16.1024C12.7588 16.1567 12.4692 16.2546 12.2417 16.4309L12.8541 17.2214ZM13.2418 17.0865C13.4665 17.0452 13.7814 17.0204 14.1966 17.0185L14.1921 16.0186C13.7479 16.0206 13.3675 16.0466 13.061 16.103L13.2418 17.0865ZM14.1943 17.0186H15.2432V16.0186H14.1943V17.0186ZM15.2432 17.0186C15.5547 17.0186 15.8141 17.0088 16.0122 16.986L15.898 15.9925C15.7562 16.0088 15.541 16.0186 15.2432 16.0186V17.0186ZM16.0171 16.9854C16.2157 16.9606 16.4424 16.9082 16.6236 16.7769L16.0366 15.9673C16.0539 15.9547 16.0566 15.9579 16.0286 15.9666C16.0019 15.9749 15.9583 15.985 15.8931 15.9931L16.0171 16.9854ZM16.6301 16.7721C16.826 16.6251 16.9321 16.4182 16.9673 16.1995L15.98 16.0408C15.9793 16.0448 15.9804 16.0347 15.9901 16.0176C16.0005 15.9995 16.0149 15.9834 16.0301 15.9721L16.6301 16.7721ZM16.9661 16.2065C16.9927 16.0551 17.0029 15.8775 17.0029 15.6836H16.0029C16.0029 15.8491 15.9936 15.9625 15.9812 16.0337L16.9661 16.2065ZM17.0029 15.6836C17.0029 15.4732 16.9842 15.2655 16.9254 15.0857L15.975 15.3967C15.9865 15.4318 16.0029 15.519 16.0029 15.6836H17.0029ZM16.9254 15.0857C16.8469 14.8457 16.6816 14.6613 16.4555 14.5546L16.0289 15.4591C16.0254 15.4574 16.0122 15.4501 15.9979 15.4339C15.9834 15.4177 15.977 15.4027 15.975 15.3967L16.9254 15.0857ZM16.4555 14.5546C16.2676 14.466 16.0404 14.4293 15.8158 14.4142L15.7486 15.412C15.9303 15.4242 16.0097 15.45 16.0289 15.4591L16.4555 14.5546ZM15.8161 14.4142C15.5988 14.3995 15.3185 14.3926 14.9795 14.3926V15.3926C15.3085 15.3926 15.5633 15.3994 15.7483 15.4119L15.8161 14.4142ZM14.9795 14.3926H14.3408V15.3926H14.9795V14.3926ZM14.3408 14.3926C13.9864 14.3926 13.694 14.3995 13.4677 14.4141L13.5323 15.412C13.7279 15.3994 13.996 15.3926 14.3408 15.3926V14.3926ZM13.4674 14.4142C13.2374 14.4292 13.0079 14.4655 12.8185 14.5517L13.2323 15.462C13.2577 15.4505 13.3447 15.4243 13.5326 15.412L13.4674 14.4142ZM12.8185 14.5517C12.5916 14.6548 12.4198 14.8354 12.336 15.078L13.2812 15.4045C13.2787 15.4117 13.2717 15.4264 13.2577 15.4416C13.2513 15.4485 13.245 15.4537 13.2399 15.4573C13.2349 15.4608 13.232 15.4622 13.2323 15.462L12.8185 14.5517ZM12.3334 15.0857C12.2745 15.2655 12.2559 15.4732 12.2559 15.6836H13.2559C13.2559 15.519 13.2723 15.4318 13.2838 15.3967L12.3334 15.0857ZM12.7559 15.1836H12.1934V16.1836H12.7559V15.1836ZM12.6934 15.6836C12.6934 15.4598 12.7188 15.3083 12.7515 15.2122L11.8051 14.8893C11.7246 15.1253 11.6934 15.3957 11.6934 15.6836H12.6934ZM12.7498 15.2172C12.7704 15.1589 12.8015 15.1196 12.8563 15.0854L12.3273 14.2368C12.0813 14.3901 11.9034 14.6106 11.8068 14.8844L12.7498 15.2172ZM12.8538 15.087C12.9224 15.0448 13.0597 14.9929 13.3026 14.9604L13.17 13.9693C12.8583 14.011 12.5659 14.09 12.3297 14.2353L12.8538 15.087ZM13.3061 14.96C13.5512 14.9254 13.8839 14.9062 14.3115 14.9062V13.9062C13.8603 13.9062 13.4762 13.9261 13.1666 13.9697L13.3061 14.96ZM14.3115 14.9062H15.0088V13.9062H14.3115V14.9062ZM15.0088 14.9062C15.4202 14.9062 15.7406 14.9254 15.9771 14.9597L16.1205 13.97C15.818 13.9262 15.445 13.9062 15.0088 13.9062V14.9062ZM15.9806 14.9602C16.2147 14.9924 16.3425 15.0433 16.4033 15.0823L16.9424 14.24C16.7102 14.0914 16.422 14.0115 16.117 13.9695L15.9806 14.9602ZM16.4059 15.0839C16.4578 15.1167 16.4875 15.1544 16.5073 15.2122L17.4537 14.8893C17.3601 14.6151 17.1848 14.3931 16.9398 14.2384L16.4059 15.0839ZM16.5073 15.2122C16.54 15.3083 16.5654 15.4598 16.5654 15.6836H17.5654C17.5654 15.3957 17.5342 15.1253 17.4537 14.8893L16.5073 15.2122ZM16.5654 15.6836C16.5654 15.9757 16.525 16.1546 16.4792 16.2542L17.388 16.6715C17.518 16.3884 17.5654 16.0477 17.5654 15.6836H16.5654ZM16.4782 16.2563C16.4541 16.3096 16.4122 16.3603 16.301 16.402L16.6521 17.3383C16.9785 17.2159 17.2412 16.9951 17.3889 16.6694L16.4782 16.2563ZM16.3033 16.4011C16.1679 16.4511 15.9301 16.4902 15.5566 16.4902V17.4902C15.9762 17.4902 16.3516 17.4493 16.6498 17.3391L16.3033 16.4011ZM15.5566 16.4902H14.2676V17.4902H15.5566V16.4902ZM14.2676 16.4902C13.9102 16.4902 13.612 16.5021 13.3812 16.5287L13.4958 17.5221C13.6712 17.5019 13.9257 17.4902 14.2676 17.4902V16.4902ZM13.3812 16.5287C13.1486 16.5555 12.9029 16.6129 12.7061 16.7467L13.2685 17.5736C13.2636 17.5769 13.2752 17.5681 13.3164 17.5557C13.3567 17.5437 13.4151 17.5314 13.4958 17.5221L13.3812 16.5287ZM12.7119 16.7429C12.5014 16.8818 12.3678 17.0856 12.3109 17.3209L13.2829 17.5561C13.2848 17.5481 13.2851 17.5516 13.2791 17.5604C13.2763 17.5645 13.2731 17.5683 13.2697 17.5717C13.2663 17.575 13.2637 17.5768 13.2627 17.5775L12.7119 16.7429ZM12.3092 17.3283C12.2704 17.5 12.2559 17.6992 12.2559 17.9131H13.2559C13.2559 17.7363 13.2687 17.6191 13.2846 17.5486L12.3092 17.3283ZM12.2559 17.9131V18.5312H13.2559V17.9131H12.2559ZM12.7559 19.0312H16.8867V18.0312H12.7559V19.0312ZM16.3867 18.5312V19H17.3867V18.5312H16.3867ZM16.8867 18.5H12.1934V19.5H16.8867V18.5ZM12.6934 19V17.9131H11.6934V19H12.6934Z" fill="black" mask="url(#path-2-outside-1_0_1)" /></svg>
            <h2>برنامه امروز</h2>
          </div>
          <div onClick={() => setActiveTab(<Charts />)} className="flex justify-start items-center gap-1 cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 16C7.39782 16 7.77936 15.842 8.06066 15.5607C8.34196 15.2794 8.5 14.8978 8.5 14.5C8.50488 14.4501 8.50488 14.3999 8.5 14.35L11.29 11.56H11.52H11.75L13.36 13.17C13.36 13.17 13.36 13.22 13.36 13.25C13.36 13.6478 13.518 14.0294 13.7993 14.3107C14.0806 14.592 14.4622 14.75 14.86 14.75C15.2578 14.75 15.6394 14.592 15.9207 14.3107C16.202 14.0294 16.36 13.6478 16.36 13.25V13.17L20 9.5C20.2967 9.5 20.5867 9.41203 20.8334 9.2472C21.08 9.08238 21.2723 8.84811 21.3858 8.57403C21.4993 8.29994 21.5291 7.99834 21.4712 7.70736C21.4133 7.41639 21.2704 7.14912 21.0607 6.93934C20.8509 6.72956 20.5836 6.5867 20.2926 6.52882C20.0017 6.47094 19.7001 6.50065 19.426 6.61418C19.1519 6.72771 18.9176 6.91997 18.7528 7.16664C18.588 7.41332 18.5 7.70333 18.5 8C18.4951 8.04988 18.4951 8.10012 18.5 8.15L14.89 11.76H14.73L13 10C13 9.60218 12.842 9.22064 12.5607 8.93934C12.2794 8.65804 11.8978 8.5 11.5 8.5C11.1022 8.5 10.7206 8.65804 10.4393 8.93934C10.158 9.22064 10 9.60218 10 10L7 13C6.60218 13 6.22064 13.158 5.93934 13.4393C5.65804 13.7206 5.5 14.1022 5.5 14.5C5.5 14.8978 5.65804 15.2794 5.93934 15.5607C6.22064 15.842 6.60218 16 7 16ZM20.5 20H3.5V3C3.5 2.73478 3.39464 2.48043 3.20711 2.29289C3.01957 2.10536 2.76522 2 2.5 2C2.23478 2 1.98043 2.10536 1.79289 2.29289C1.60536 2.48043 1.5 2.73478 1.5 3V21C1.5 21.2652 1.60536 21.5196 1.79289 21.7071C1.98043 21.8946 2.23478 22 2.5 22H20.5C20.7652 22 21.0196 21.8946 21.2071 21.7071C21.3946 21.5196 21.5 21.2652 21.5 21C21.5 20.7348 21.3946 20.4804 21.2071 20.2929C21.0196 20.1054 20.7652 20 20.5 20Z" fill="black" /></svg>
            <h2>نمودار پیشرفت روزانه</h2>
          </div>
        </div>

        <div className="p-3 mt-10">
          <label onClick={() => setNewCategory(false)} className={`${newCategory ? "block" : 'hidden'} w-dvw h-dvh top-0 left-0 z-10 absolute`}> </label>
          <h2 className="text-xl mb-5">دسته بندی ها</h2>
          <p>کار</p>
          <p>تست</p>
          <p>ورزش</p>
          <p>مدرسه</p>
          <div onClick={() => setNewCategory(true)} className="flex justify-start items-center mt-5 cursor-pointer">
            <p>اضافه کردن دسته بندی </p>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_28_109)">  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z" fill="#2f24ff" /></g><defs>  <clipPath id="clip0_28_109"><rect width="24" height="24" fill="white" /></clipPath></defs></svg>
          </div>
          {newCategory &&
            <form className="w-72 h-44 border-2 border-[#ddd] text-sm p-5 z-10 absolute rounded-lg gap-5 flex mt-5 flex-col">
              <div className="flex justify-between items-center">
                <h2>چه دسته بندی ای اضافه کنیم؟</h2>
                <svg onClick={()=>setNewCategory(false)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">  <g clipPath="url(#clip0_28_60)">    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#323232" />  </g>  <defs>    <clipPath id="clip0_28_60">      <rect width="24" height="24" fill="white" />    </clipPath>  </defs></svg>
              </div>
              <input type="text" required className="input border-2 border-[#ddd] w-full text-sm" />
              <button className="w-full bg-blue-500 h-12 text-white rounded-lg">اضافه کردن</button>
            </form>
          }
        </div>
      </div>
      <div className="w-full min-h-screen relative">
        {activeTab ? activeTab : <h2 className="text-3xl flex justify-center items-center font-gofteh my-80">خوش آمدی امیر عزیز برای شروع از پنل سمت راست یک گزینه انتخاب کن :)</h2>}
      </div>
    </div>

  )
}
