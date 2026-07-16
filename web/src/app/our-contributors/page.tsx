'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/ui/navbar'
import { Footer } from '@/components/ui/footer'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Contributor {
  handle: string
  name: string
  img: string
  url: string
  years: number[]
}



const PROJECT_ADMIN: Contributor = {
  handle: '@SB2318',
  name: 'Susmita Bhattacharya',
  img: 'https://avatars.githubusercontent.com/u/87614560?v=4',
  url: 'https://github.com/SB2318',
  years: [2024, 2026],
}

const ALL_CONTRIBUTORS: Contributor[] = [
  // ── Shared 2024 + 2026 ──────────────────────────────────────────────────────
  { handle: '@suhanipaliwal',   name: 'Suhani Singh Paliwal',         img: 'https://avatars.githubusercontent.com/u/161575955?v=4', url: 'https://github.com/suhanipaliwal',   years: [2024, 2026] },
  { handle: '@BHS-Harish',      name: 'Balaharisankar L',             img: 'https://avatars.githubusercontent.com/u/114602603?v=4', url: 'https://github.com/BHS-Harish',      years: [2024, 2026] },
  { handle: '@SharmaNishchay',  name: 'Sharma Nischay',               img: 'https://avatars.githubusercontent.com/u/146124877?v=4', url: 'https://github.com/SharmaNishchay',  years: [2024, 2026] },
  { handle: '@officeneerajsaini',name:'Neeraj Saini',                  img: 'https://avatars.githubusercontent.com/u/118799941?v=4', url: 'https://github.com/officeneerajsaini',years:[2024,2026]},
  { handle: '@meghanagottapu',  name: 'Meghana Gottapu',              img: 'https://avatars.githubusercontent.com/u/43183125?v=4',  url: 'https://github.com/meghanagottapu',  years: [2024, 2026] },
  { handle: '@jaickeyminj',     name: 'Jaickey Joy Minj',             img: 'https://avatars.githubusercontent.com/u/95216865?v=4',  url: 'https://github.com/jaickeyminj',     years: [2024, 2026] },
  { handle: '@Asymtode712',     name: 'Siddheya Kulkarni',            img: 'https://avatars.githubusercontent.com/u/115717746?v=4', url: 'https://github.com/Asymtode712',     years: [2024, 2026] },
  { handle: '@PradnyaGaitonde', name: 'Pradnya Gaitonde',             img: 'https://avatars.githubusercontent.com/u/116059908?v=4', url: 'https://github.com/PradnyaGaitonde', years: [2024, 2026] },
  { handle: '@sanmarg',         name: 'Sanmarg Paranjpe',             img: 'https://avatars.githubusercontent.com/u/50082154?v=4',  url: 'https://github.com/sanmarg',         years: [2024, 2026] },
  { handle: '@adrikaDwivedi',   name: 'Adrika Dwivedi',               img: 'https://avatars.githubusercontent.com/u/89826992?v=4',  url: 'https://github.com/adrikaDwivedi',   years: [2024, 2026] },
  { handle: '@Arpcoder',        name: 'Arpna',                        img: 'https://avatars.githubusercontent.com/u/100352419?v=4', url: 'https://github.com/Arpcoder',        years: [2024, 2026] },
  { handle: '@alishasingh06',   name: 'Alisha Singh',                 img: 'https://avatars.githubusercontent.com/u/114938485?v=4', url: 'https://github.com/alishasingh06',   years: [2024, 2026] },
  { handle: '@Sibam-Paul',      name: 'Sibam Paul',                   img: 'https://avatars.githubusercontent.com/u/158052549?v=4', url: 'https://github.com/Sibam-Paul',      years: [2024, 2026] },
  { handle: '@rushiii3',        name: 'Hrushikesh Shinde',            img: 'https://avatars.githubusercontent.com/u/105168088?v=4', url: 'https://github.com/rushiii3',        years: [2024, 2026] },
  { handle: '@soham0005',       name: 'Soham Adhyapak',               img: 'https://avatars.githubusercontent.com/u/83421425?v=4',  url: 'https://github.com/soham0005',       years: [2024, 2026] },
  { handle: '@kylie-kiaying',   name: 'Kylie',                        img: 'https://avatars.githubusercontent.com/u/133581245?v=4', url: 'https://github.com/kylie-kiaying',   years: [2024, 2026] },
  { handle: '@Himanshu8850',    name: 'Himanshu Choudhary',           img: 'https://avatars.githubusercontent.com/u/128601673?v=4', url: 'https://github.com/Himanshu8850',    years: [2024, 2026] },
  { handle: '@Hemu21',          name: 'Hemanth Kumar',                img: 'https://avatars.githubusercontent.com/u/106808387?v=4', url: 'https://github.com/Hemu21',          years: [2024, 2026] },
  { handle: '@nishant0708',     name: 'Nishant Kaushal',              img: 'https://avatars.githubusercontent.com/u/101548649?v=4', url: 'https://github.com/nishant0708',     years: [2024, 2026] },
  { handle: '@Kamaleshbala01',  name: 'Kamalesh Bala',                img: 'https://avatars.githubusercontent.com/u/139665559?v=4', url: 'https://github.com/Kamaleshbala01',  years: [2024, 2026] },
  { handle: '@ParthNakum21',    name: 'Parth Nakum',                  img: 'https://avatars.githubusercontent.com/u/134558990?v=4', url: 'https://github.com/ParthNakum21',    years: [2024, 2026] },
  { handle: '@Abhigna-arsam',   name: 'Abhigna Arsam',                img: 'https://avatars.githubusercontent.com/u/125258286?v=4', url: 'https://github.com/Abhigna-arsam',   years: [2024, 2026] },
  { handle: '@MaryamMohamedYahya',name:'Maryam Mohamed Yahya',        img: 'https://avatars.githubusercontent.com/u/147263523?v=4', url: 'https://github.com/MaryamMohamedYahya',years:[2024,2026]},
  { handle: '@thevijayshankersharma',name:'Vijay Shanker Sharma',      img: 'https://avatars.githubusercontent.com/u/109781385?v=4', url: 'https://github.com/thevijayshankersharma',years:[2024,2026]},
  { handle: '@TonyStark-47',    name: 'Tony Stark',                   img: 'https://avatars.githubusercontent.com/u/73957207?v=4',  url: 'https://github.com/TonyStark-47',    years: [2024, 2026] },
  { handle: '@iamworrell',      name: 'Worrell Seville',              img: 'https://avatars.githubusercontent.com/u/99043769?v=4',  url: 'https://github.com/iamworrell',      years: [2024, 2026] },
  { handle: '@Aditijainnn',     name: 'Aditi',                        img: 'https://avatars.githubusercontent.com/u/144632601?v=4', url: 'https://github.com/Aditijainnn',     years: [2024, 2026] },
  { handle: '@ananyag309',      name: 'Ananya Gupta',                 img: 'https://avatars.githubusercontent.com/u/145869907?v=4', url: 'https://github.com/ananyag309',      years: [2024, 2026] },
  { handle: '@akshathere',      name: 'Akshat',                       img: 'https://avatars.githubusercontent.com/u/106247875?v=4', url: 'https://github.com/akshathere',      years: [2024, 2026] },
  { handle: '@Ayushmaanagarwal1211',name:'Ayushmaan Agarwal',          img: 'https://avatars.githubusercontent.com/u/118350936?v=4', url: 'https://github.com/Ayushmaanagarwal1211',years:[2024,2026]},
  { handle: '@Damini2004',      name: 'Damini Chachane',              img: 'https://avatars.githubusercontent.com/u/119414762?v=4', url: 'https://github.com/Damini2004',      years: [2024, 2026] },
  { handle: '@Parth20GitHub',   name: 'Parth Shah',                   img: 'https://avatars.githubusercontent.com/u/142086512?v=4', url: 'https://github.com/Parth20GitHub',   years: [2024, 2026] },
  { handle: '@sreevidya-16',    name: 'Sree Vidya',                   img: 'https://avatars.githubusercontent.com/u/115856774?v=4', url: 'https://github.com/sreevidya-16',    years: [2024, 2026] },
  { handle: '@AsmitaMishra24',  name: 'Asmita Mishra',                img: 'https://avatars.githubusercontent.com/u/146121869?v=4', url: 'https://github.com/AsmitaMishra24',  years: [2024, 2026] },
  { handle: '@iamkanhaiyakumar',name: 'Kanhaiya Kumar',               img: 'https://avatars.githubusercontent.com/u/120328606?v=4', url: 'https://github.com/iamkanhaiyakumar',years:[2024,2026]},
  { handle: '@revanth1718',     name: 'Revanth Pasupuleti',           img: 'https://avatars.githubusercontent.com/u/109272714?v=4', url: 'https://github.com/revanth1718',     years: [2024, 2026] },
  { handle: '@arunimaChintu',   name: 'Arunima Dutta',                img: 'https://avatars.githubusercontent.com/u/99474881?v=4',  url: 'https://github.com/arunimaChintu',   years: [2024, 2026] },
  { handle: '@Maana-Ajmera',    name: 'Maana Ajmera',                 img: 'https://avatars.githubusercontent.com/u/162733812?v=4', url: 'https://github.com/Maana-Ajmera',    years: [2024, 2026] },
  { handle: '@ANKeshri',        name: 'Aditya Narayan',               img: 'https://avatars.githubusercontent.com/u/159682348?v=4', url: 'https://github.com/ANKeshri',        years: [2024, 2026] },
  { handle: '@Utsavladia',      name: 'Utsav Ladia',                  img: 'https://avatars.githubusercontent.com/u/124615886?v=4', url: 'https://github.com/Utsavladia',      years: [2024, 2026] },
  { handle: '@Nayanika1402',    name: 'Nayanika Mukherjee',           img: 'https://avatars.githubusercontent.com/u/132455412?v=4', url: 'https://github.com/Nayanika1402',    years: [2024, 2026] },
  { handle: '@Maheshwari-Love', name: 'Maheshwari Love',              img: 'https://avatars.githubusercontent.com/u/142833275?v=4', url: 'https://github.com/Maheshwari-Love', years: [2024, 2026] },
  { handle: '@Pujan-sarkar',    name: 'Pujan Sarkar',                 img: 'https://avatars.githubusercontent.com/u/144250917?v=4', url: 'https://github.com/Pujan-sarkar',    years: [2024, 2026] },

  // ── 2026 only ───────────────────────────────────────────────────────────────
  { handle: '@tristnaja',            name: 'Tristan Al Harrish',          img: 'https://avatars.githubusercontent.com/u/121044617?v=4', url: 'https://github.com/tristnaja',            years: [2026] },
  { handle: '@ionfwsrijan',          name: 'SrijanCodes',                 img: 'https://avatars.githubusercontent.com/u/201338831?v=4', url: 'https://github.com/ionfwsrijan',          years: [2026] },
  { handle: '@Sparshjoshi-iit',      name: 'Sparsh Joshi',                img: 'https://avatars.githubusercontent.com/u/181929259?v=4', url: 'https://github.com/Sparshjoshi-iit',      years: [2026] },
  { handle: '@Namraa310806',         name: 'Patel Namraa',                img: 'https://avatars.githubusercontent.com/u/131944677?v=4', url: 'https://github.com/Namraa310806',         years: [2026] },
  { handle: '@Randomlyclueless',     name: 'Kimaya Chavan',               img: 'https://avatars.githubusercontent.com/u/144950366?v=4', url: 'https://github.com/Randomlyclueless',     years: [2026] },
  { handle: '@Vaishnavi10706',       name: 'Vaishnavi',                   img: 'https://avatars.githubusercontent.com/u/209587091?v=4', url: 'https://github.com/Vaishnavi10706',       years: [2026] },
  { handle: '@Chandrika987',         name: 'Chandrika',                   img: 'https://avatars.githubusercontent.com/u/221697990?v=4', url: 'https://github.com/Chandrika987',         years: [2026] },
  { handle: '@bhavyaxtech',          name: 'Bhavya Reddy',                img: 'https://avatars.githubusercontent.com/u/202380426?v=4', url: 'https://github.com/bhavyaxtech',          years: [2026] },
  { handle: '@Harshit-Maurya838',    name: 'Harshit Maurya',              img: 'https://avatars.githubusercontent.com/u/174622309?v=4', url: 'https://github.com/Harshit-Maurya838',    years: [2026] },
  { handle: '@Preksha0401',          name: 'Preksha Pravin Salvi',        img: 'https://avatars.githubusercontent.com/u/155712570?v=4', url: 'https://github.com/Preksha0401',          years: [2026] },
  { handle: '@Tanisha-sharma7302',   name: 'Tanisha Sharma',              img: 'https://avatars.githubusercontent.com/u/227324372?v=4', url: 'https://github.com/Tanisha-sharma7302',   years: [2026] },
  { handle: '@saurabhhhcodes',       name: 'Saurabh Kumar Bajpai',        img: 'https://avatars.githubusercontent.com/u/157192462?v=4', url: 'https://github.com/saurabhhhcodes',       years: [2026] },
  { handle: '@SarthakKharche',       name: 'Sarthak Kharche',             img: 'https://avatars.githubusercontent.com/u/187843039?v=4', url: 'https://github.com/SarthakKharche',       years: [2026] },
  { handle: '@indresh404',           name: 'Indresh',                     img: 'https://avatars.githubusercontent.com/u/256361574?v=4', url: 'https://github.com/indresh404',           years: [2026] },
  { handle: '@Aditya-br',           name: 'Aditya B R',                  img: 'https://avatars.githubusercontent.com/u/172393580?v=4', url: 'https://github.com/Aditya-br',            years: [2026] },
  { handle: '@Kaustav2706',          name: 'Koustav Halder',              img: 'https://avatars.githubusercontent.com/u/249536131?v=4', url: 'https://github.com/Kaustav2706',          years: [2026] },
  { handle: '@abhilashgedela28-lang',name: 'Abhilash Gedela',             img: 'https://avatars.githubusercontent.com/u/251615976?v=4', url: 'https://github.com/abhilashgedela28-lang',years: [2026] },
  { handle: '@hari2k7',             name: 'Hariharasudhan D',             img: 'https://avatars.githubusercontent.com/u/232849976?v=4', url: 'https://github.com/hari2k7',              years: [2026] },
  { handle: '@Sujith-RMD',          name: 'SujithKumar R',               img: 'https://avatars.githubusercontent.com/u/224506968?v=4', url: 'https://github.com/Sujith-RMD',          years: [2026] },
  { handle: '@abdullahxyz85',        name: 'Abdullah Jameel',             img: 'https://avatars.githubusercontent.com/u/181183976?v=4', url: 'https://github.com/abdullahxyz85',        years: [2026] },
  { handle: '@hema7392',             name: 'Hemadri',                     img: 'https://avatars.githubusercontent.com/u/142394039?v=4', url: 'https://github.com/hema7392',             years: [2026] },
  { handle: '@basantnema31',         name: 'Basant Nema',                 img: 'https://avatars.githubusercontent.com/u/208905651?v=4', url: 'https://github.com/basantnema31',         years: [2026] },
  { handle: '@Priya09023',           name: 'Priya',                       img: 'https://avatars.githubusercontent.com/u/218076920?v=4', url: 'https://github.com/Priya09023',           years: [2026] },
  { handle: '@Krishnx21',           name: 'Krishna Kumar',               img: 'https://avatars.githubusercontent.com/u/194249486?v=4', url: 'https://github.com/Krishnx21',            years: [2026] },
  { handle: '@jpdevhub',             name: 'Karan Singh',                 img: 'https://avatars.githubusercontent.com/u/160400709?v=4', url: 'https://github.com/jpdevhub',             years: [2026] },
  { handle: '@SiddharthRiot',        name: 'Siddharth',                   img: 'https://avatars.githubusercontent.com/u/133003051?v=4', url: 'https://github.com/SiddharthRiot',        years: [2026] },
  { handle: '@KRUSHAL2956',          name: 'Krushal Hirpara',             img: 'https://avatars.githubusercontent.com/u/134606696?v=4', url: 'https://github.com/KRUSHAL2956',          years: [2026] },
  { handle: '@nyxsky404',            name: 'Sumit Kumar',                 img: 'https://avatars.githubusercontent.com/u/189461188?v=4', url: 'https://github.com/nyxsky404',            years: [2026] },
  { handle: '@PranavAgarkar07',      name: 'Pranav Agarkar',              img: 'https://avatars.githubusercontent.com/u/90404176?v=4',  url: 'https://github.com/PranavAgarkar07',      years: [2026] },
  { handle: '@Sha-lini3',            name: 'Shalini Yadav',               img: 'https://avatars.githubusercontent.com/u/184716203?v=4', url: 'https://github.com/Sha-lini3',            years: [2026] },
  { handle: '@Kinara2020',           name: 'Kinara Patel',                img: 'https://avatars.githubusercontent.com/u/199802893?v=4', url: 'https://github.com/Kinara2020',           years: [2026] },
  { handle: '@SwaraMishra07',        name: 'Swara Mishra',                img: 'https://avatars.githubusercontent.com/u/197755595?v=4', url: 'https://github.com/SwaraMishra07',        years: [2026] },
  { handle: '@Srejoye',              name: 'Srejoye Saha',                img: 'https://avatars.githubusercontent.com/u/177326090?v=4', url: 'https://github.com/Srejoye',              years: [2026] },
  { handle: '@Priyanshu1-62',        name: 'Priyanshu Bariar',            img: 'https://avatars.githubusercontent.com/u/150027236?v=4', url: 'https://github.com/Priyanshu1-62',        years: [2026] },
  { handle: '@Yogender-verma',       name: 'Yogender Verma',              img: 'https://avatars.githubusercontent.com/u/232599506?v=4', url: 'https://github.com/Yogender-verma',       years: [2026] },
  { handle: '@jyoti-5906',           name: 'Jyoti',                       img: 'https://avatars.githubusercontent.com/u/205121361?v=4', url: 'https://github.com/jyoti-5906',           years: [2026] },
  { handle: '@Jay-Jay-Tee',          name: 'Joshua Jacob Thomas',          img: 'https://avatars.githubusercontent.com/u/48431463?v=4',  url: 'https://github.com/Jay-Jay-Tee',          years: [2026] },
  { handle: '@vedant7007',           name: 'Vedant',                      img: 'https://avatars.githubusercontent.com/u/170861579?v=4', url: 'https://github.com/vedant7007',           years: [2026] },
  { handle: '@riya-dumbare',         name: 'Riya Dumbare',                img: 'https://avatars.githubusercontent.com/u/223732363?v=4', url: 'https://github.com/riya-dumbare',         years: [2026] },
  { handle: '@minhajparveenh2008',   name: 'Minhaj Parveen H',            img: 'https://avatars.githubusercontent.com/u/252563726?v=4', url: 'https://github.com/minhajparveenh2008',   years: [2026] },
  { handle: '@anushkasrvstv',        name: 'Anushka Srivastava',          img: 'https://avatars.githubusercontent.com/u/172965285?v=4', url: 'https://github.com/anushkasrvstv',        years: [2026] },
  { handle: '@manishworkss',         name: 'Manish Kumar',                img: 'https://avatars.githubusercontent.com/u/187859194?v=4', url: 'https://github.com/manishworkss',         years: [2026] },
  { handle: '@codecrafted1',         name: 'Khushi Ambastha',             img: 'https://avatars.githubusercontent.com/u/238506609?v=4', url: 'https://github.com/codecrafted1',         years: [2026] },
  { handle: '@DeepeshKafalatiya',    name: 'Dipesh',                      img: 'https://avatars.githubusercontent.com/u/218188439?v=4', url: 'https://github.com/DeepeshKafalatiya',    years: [2026] },
  { handle: '@prernaajaypatil-oss',  name: 'Prerna Ajay Patil',           img: 'https://avatars.githubusercontent.com/u/266280912?v=4', url: 'https://github.com/prernaajaypatil-oss',  years: [2026] },
  { handle: '@Dhandapanikeerthana',  name: 'Keerthana',                   img: 'https://avatars.githubusercontent.com/u/181437739?v=4', url: 'https://github.com/Dhandapanikeerthana',  years: [2026] },
  { handle: '@Ashley-Shine',         name: 'Ashley Shine',                img: 'https://avatars.githubusercontent.com/u/197347819?v=4', url: 'https://github.com/Ashley-Shine',         years: [2026] },
  { handle: '@PeswikaBavagni-30',    name: 'Peswika Bavagni',             img: 'https://avatars.githubusercontent.com/u/229588032?v=4', url: 'https://github.com/PeswikaBavagni-30',    years: [2026] },
  { handle: '@Nikkiraj4',            name: 'Nikki Raj',                   img: 'https://avatars.githubusercontent.com/u/188448243?v=4', url: 'https://github.com/Nikkiraj4',            years: [2026] },
  { handle: '@bhavyasree-22',        name: 'Bhavya Sree',                 img: 'https://avatars.githubusercontent.com/u/179308784?v=4', url: 'https://github.com/bhavyasree-22',        years: [2026] },
  { handle: '@vaishnavi003-svg',     name: 'Vaishnavi',                   img: 'https://avatars.githubusercontent.com/u/226036491?v=4', url: 'https://github.com/vaishnavi003-svg',     years: [2026] },
  { handle: '@bethesky01',           name: 'Prerna Singh',                img: 'https://avatars.githubusercontent.com/u/213299962?v=4', url: 'https://github.com/bethesky01',           years: [2026] },
  { handle: '@Nareshkumawat-star',   name: 'Naresh Kumawat',              img: 'https://avatars.githubusercontent.com/u/207768679?v=4', url: 'https://github.com/Nareshkumawat-star',   years: [2026] },
  { handle: '@Shrestha-ijarwal',     name: 'Shrestha Ijarwal',            img: 'https://avatars.githubusercontent.com/u/246360066?v=4', url: 'https://github.com/Shrestha-ijarwal',     years: [2026] },
  { handle: '@Gurkaran18',           name: 'Gurkaran Singh',              img: 'https://avatars.githubusercontent.com/u/143310060?v=4', url: 'https://github.com/Gurkaran18',           years: [2026] },
  { handle: '@silentguyracer',       name: 'Silent Guy Racer',            img: 'https://avatars.githubusercontent.com/u/195958565?v=4', url: 'https://github.com/silentguyracer',       years: [2026] },
  { handle: '@Wombatfreak6',         name: 'Wombfrk exe',                 img: 'https://avatars.githubusercontent.com/u/163987103?v=4', url: 'https://github.com/Wombatfreak6',         years: [2026] },
  { handle: '@deepsikha-dash',       name: 'Deepsikha Dash',              img: 'https://avatars.githubusercontent.com/u/232145023?v=4', url: 'https://github.com/deepsikha-dash',       years: [2026] },
  { handle: '@divanshuaggarwal30',   name: 'Divanshu Aggarwal',           img: 'https://avatars.githubusercontent.com/u/223733104?v=4', url: 'https://github.com/divanshuaggarwal30',   years: [2026] },
  { handle: '@smridhi-07',           name: 'Smridhi',                     img: 'https://avatars.githubusercontent.com/u/226873227?v=4', url: 'https://github.com/smridhi-07',           years: [2026] },
  { handle: '@Janarthanang-10',      name: 'Janarthanan G',               img: 'https://avatars.githubusercontent.com/u/234872499?v=4', url: 'https://github.com/Janarthanang-10',      years: [2026] },
  { handle: '@shravi25',             name: 'Shraviya Ramesh Poojary',     img: 'https://avatars.githubusercontent.com/u/219078114?v=4', url: 'https://github.com/shravi25',             years: [2026] },
  { handle: '@mannatjain11465-netizen',name:'Mannat Jain',                 img: 'https://avatars.githubusercontent.com/u/226103934?v=4', url: 'https://github.com/mannatjain11465-netizen',years:[2026]},
  { handle: '@Stewartsson',          name: 'John Stewartsson J R',        img: 'https://avatars.githubusercontent.com/u/198082561?v=4', url: 'https://github.com/Stewartsson',          years: [2026] },
  { handle: '@Deepak-Akuthota',      name: 'Deepak Akuthota',             img: 'https://avatars.githubusercontent.com/u/192285199?v=4', url: 'https://github.com/Deepak-Akuthota',      years: [2026] },
  { handle: '@Kr1491',               name: 'Krishna Jha',                 img: 'https://avatars.githubusercontent.com/u/107742536?v=4', url: 'https://github.com/Kr1491',               years: [2026] },
  { handle: '@sahare-mayur-0071',    name: 'Mayur Ajit Sahare',           img: 'https://avatars.githubusercontent.com/u/184800556?v=4', url: 'https://github.com/sahare-mayur-0071',    years: [2026] },
  { handle: '@kandhwayanushka-hue',  name: 'Anushka Kandhway',            img: 'https://avatars.githubusercontent.com/u/231687775?v=4', url: 'https://github.com/kandhwayanushka-hue',  years: [2026] },
  { handle: '@dinesh9997',           name: 'Gujju Dinesh',                img: 'https://avatars.githubusercontent.com/u/217073059?v=4', url: 'https://github.com/dinesh9997',           years: [2026] },
  { handle: '@dishamalukani-creator',name: 'Disha Malukani',              img: 'https://avatars.githubusercontent.com/u/266451120?v=4', url: 'https://github.com/dishamalukani-creator',years: [2026] },
  { handle: '@Kruthi-choudary',      name: 'Kruthi',                      img: 'https://avatars.githubusercontent.com/u/230213533?v=4', url: 'https://github.com/Kruthi-choudary',      years: [2026] },
  { handle: '@Hasini2706',           name: 'Hasini',                      img: 'https://avatars.githubusercontent.com/u/180012483?v=4', url: 'https://github.com/Hasini2706',           years: [2026] },
  { handle: '@anjali62510-star',     name: 'Anjali',                      img: 'https://avatars.githubusercontent.com/u/221178990?v=4', url: 'https://github.com/anjali62510-star',     years: [2026] },
  { handle: '@aspartic-gthb',        name: 'Anirudh Sahu',                img: 'https://avatars.githubusercontent.com/u/243364071?v=4', url: 'https://github.com/aspartic-gthb',        years: [2026] },
  { handle: '@Saylee12R',            name: 'Saylee',                      img: 'https://avatars.githubusercontent.com/u/230833976?v=4', url: 'https://github.com/Saylee12R',            years: [2026] },
  { handle: '@abdulhaque2005',       name: 'Abdulhaque',                  img: 'https://avatars.githubusercontent.com/u/225173958?v=4', url: 'https://github.com/abdulhaque2005',       years: [2026] },
  { handle: '@priyanshu5ingh',       name: 'Priyanshu Singh',             img: 'https://avatars.githubusercontent.com/u/98865320?v=4',  url: 'https://github.com/priyanshu5ingh',       years: [2026] },
  { handle: '@Neverask1121',         name: 'Aditya Bhandari',             img: 'https://avatars.githubusercontent.com/u/217045060?v=4', url: 'https://github.com/Neverask1121',         years: [2026] },
  { handle: '@FarishaNA',            name: 'Farisha N A',                 img: 'https://avatars.githubusercontent.com/u/147705381?v=4', url: 'https://github.com/FarishaNA',            years: [2026] },
  { handle: '@Ranjana-git7',         name: 'Tenax',                       img: 'https://avatars.githubusercontent.com/u/219678427?v=4', url: 'https://github.com/Ranjana-git7',         years: [2026] },
  { handle: '@Bheemeswari497',       name: 'Bheeme 497',                  img: 'https://avatars.githubusercontent.com/u/180012790?v=4', url: 'https://github.com/Bheemeswari497',       years: [2026] },
  { handle: '@arpan-adhikary26',     name: 'Arpan Adhikary',              img: 'https://avatars.githubusercontent.com/u/225717254?v=4', url: 'https://github.com/arpan-adhikary26',     years: [2026] },
  { handle: '@Pcmhacker-piro',       name: 'Prakash Meena',               img: 'https://avatars.githubusercontent.com/u/181658297?v=4', url: 'https://github.com/Pcmhacker-piro',       years: [2026] },
  { handle: '@semanirudh94-lang',    name: 'Piyush Semalti',              img: 'https://avatars.githubusercontent.com/u/224640398?v=4', url: 'https://github.com/semanirudh94-lang',    years: [2026] },
  { handle: '@Arpita2919',           name: 'Arpita Raj',                  img: 'https://avatars.githubusercontent.com/u/153080323?v=4', url: 'https://github.com/Arpita2919',           years: [2026] },
  { handle: '@pratik-dev01',         name: 'Pratik Ankush Bandgar',       img: 'https://avatars.githubusercontent.com/u/180295981?v=4', url: 'https://github.com/pratik-dev01',         years: [2026] },
  { handle: '@vanshikaMaheshwari',   name: 'Vanshika Maheshwari',         img: 'https://avatars.githubusercontent.com/u/73647007?v=4',  url: 'https://github.com/vanshikaMaheshwari',   years: [2026] },
  { handle: '@karthikeyakakarlapudi2007',name:'Karthikeya Kakarlapudi',    img: 'https://avatars.githubusercontent.com/u/239514583?v=4', url: 'https://github.com/karthikeyakakarlapudi2007',years:[2026]},
  { handle: '@Tomeshwari-02',        name: 'Tomeshwari Sahu',             img: 'https://avatars.githubusercontent.com/u/179694969?v=4', url: 'https://github.com/Tomeshwari-02',        years: [2026] },
  { handle: '@harshitavaishnav7878', name: 'Harshita Vaishnav',           img: 'https://avatars.githubusercontent.com/u/198601301?v=4', url: 'https://github.com/harshitavaishnav7878', years: [2026] },
  { handle: '@santoshsingampalli11-hub',name:'S V Rama Santosh',           img: 'https://avatars.githubusercontent.com/u/239569042?v=4', url: 'https://github.com/santoshsingampalli11-hub',years:[2026]},
  { handle: '@kavin553',             name: 'Kavin',                       img: 'https://avatars.githubusercontent.com/u/197105342?v=4', url: 'https://github.com/kavin553',             years: [2026] },
  { handle: '@DakshtaMethwani',      name: 'Dakshta Methwani',            img: 'https://avatars.githubusercontent.com/u/193815683?v=4', url: 'https://github.com/DakshtaMethwani',      years: [2026] },
  { handle: '@abhinavkhedwal4-maker',name: 'AK Explores',                 img: 'https://avatars.githubusercontent.com/u/234247126?v=4', url: 'https://github.com/abhinavkhedwal4-maker',years: [2026] },
  { handle: '@gargshambhavi0802-pixel',name:'Shambhavi Garg',             img: 'https://avatars.githubusercontent.com/u/258162308?v=4', url: 'https://github.com/gargshambhavi0802-pixel',years:[2026]},
  { handle: '@Priyanshi-untitled',   name: 'Priyanshi Varshney',          img: 'https://avatars.githubusercontent.com/u/217366737?v=4', url: 'https://github.com/Priyanshi-untitled',   years: [2026] },
  { handle: '@sanikatavate',         name: 'Sanika Tavate',               img: 'https://avatars.githubusercontent.com/u/162703966?v=4', url: 'https://github.com/sanikatavate',         years: [2026] },
  { handle: '@hariom888',            name: 'Hariom',                      img: 'https://avatars.githubusercontent.com/u/188325558?v=4', url: 'https://github.com/hariom888',            years: [2026] },
  { handle: '@Rashmi2806525',        name: 'Rashmii',                     img: 'https://avatars.githubusercontent.com/u/279509198?v=4', url: 'https://github.com/Rashmi2806525',        years: [2026] },
  { handle: '@anshul23102',          name: 'Anshul Jain',                 img: 'https://avatars.githubusercontent.com/u/167362756?v=4', url: 'https://github.com/anshul23102',          years: [2026] },
  { handle: '@Tech4Aditya',          name: 'Aditya Pandey',               img: 'https://avatars.githubusercontent.com/u/220623325?v=4', url: 'https://github.com/Tech4Aditya',          years: [2026] },
  { handle: '@vishal1011001',        name: 'Vishal',                      img: 'https://avatars.githubusercontent.com/u/138993166?v=4', url: 'https://github.com/vishal1011001',        years: [2026] },
  { handle: '@Ayushi-hi',            name: 'Ayushi',                      img: 'https://avatars.githubusercontent.com/u/191128012?v=4', url: 'https://github.com/Ayushi-hi',            years: [2026] },
  { handle: '@Alishaa-987',          name: 'Alisha Fatima',               img: 'https://avatars.githubusercontent.com/u/185054377?v=4', url: 'https://github.com/Alishaa-987',          years: [2026] },
  { handle: '@xRUDRAx0',             name: 'RUdess',                      img: 'https://avatars.githubusercontent.com/u/221582524?v=4', url: 'https://github.com/xRUDRAx0',             years: [2026] },
  { handle: '@eranmol2007-coder',    name: 'Anmol Kumar Singh',           img: 'https://avatars.githubusercontent.com/u/227629043?v=4', url: 'https://github.com/eranmol2007-coder',    years: [2026] },
  { handle: '@dokkuprashanth7',      name: 'Prashanth',                   img: 'https://avatars.githubusercontent.com/u/239514979?v=4', url: 'https://github.com/dokkuprashanth7',      years: [2026] },
  { handle: '@Kadaliswarna',         name: 'Swarna',                      img: 'https://avatars.githubusercontent.com/u/180524407?v=4', url: 'https://github.com/Kadaliswarna',         years: [2026] },
  { handle: '@AnkitaKumariii',       name: 'Ankita',                      img: 'https://avatars.githubusercontent.com/u/213439154?v=4', url: 'https://github.com/AnkitaKumariii',       years: [2026] },
  { handle: '@PARNITA-SINGH',        name: 'Parnita Singh',               img: 'https://avatars.githubusercontent.com/u/85277783?v=4',  url: 'https://github.com/PARNITA-SINGH',        years: [2026] },
  { handle: '@Suyash2527',           name: 'Suyash Chaudhari',            img: 'https://avatars.githubusercontent.com/u/174765943?v=4', url: 'https://github.com/Suyash2527',           years: [2026] },
  { handle: '@Kirti391',             name: 'Kirti',                       img: 'https://avatars.githubusercontent.com/u/162712321?v=4', url: 'https://github.com/Kirti391',             years: [2026] },
  { handle: '@THILAK-RAJ16',         name: 'Thilak Raj',                  img: 'https://avatars.githubusercontent.com/u/182337582?v=4', url: 'https://github.com/THILAK-RAJ16',         years: [2026] },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function OurContributorsPage() {
  const [search, setSearch] = useState('')
  const [yearFilter, setYearFilter] = useState<'all' | 2024 | 2026>('all')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return ALL_CONTRIBUTORS.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(q) ||
        c.handle.toLowerCase().includes(q)
      const matchesYear =
        yearFilter === 'all' || c.years.includes(yearFilter as number)
      return matchesSearch && matchesYear
    })
  }, [search, yearFilter])

  const totalUnique = ALL_CONTRIBUTORS.length + 1 // +1 for admin

  return (
    <>
      <style>{`
        .contrib-wall-page {
          min-height: 100vh;
          background: #f8fafc;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .contrib-wall-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 60%, #f5576c 100%);
          padding: 140px 24px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .contrib-wall-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.4;
        }
        .contrib-wall-hero-inner { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; }
        .contrib-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);
          border-radius: 50px; padding: 6px 18px; margin-bottom: 24px;
          color: rgba(255,255,255,0.95); font-size: 0.78rem; font-weight: 800;
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .contrib-wall-title {
          font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 900; color: white;
          line-height: 1.15; margin: 0 0 18px; text-shadow: 0 2px 12px rgba(0,0,0,0.18);
        }
        .contrib-wall-sub {
          font-size: 1.1rem; color: rgba(255,255,255,0.82); line-height: 1.8;
          margin: 0 0 40px;
        }
        .contrib-stat-row {
          display: flex; gap: 32px; justify-content: center; flex-wrap: wrap; margin-bottom: 48px;
        }
        .contrib-stat-chip {
          background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25);
          border-radius: 16px; padding: 14px 24px; text-align: center; backdrop-filter: blur(8px);
          min-width: 110px;
        }
        .contrib-stat-num { font-size: 1.8rem; font-weight: 900; color: white; line-height: 1; }
        .contrib-stat-label { font-size: 0.75rem; font-weight: 700; color: rgba(255,255,255,0.65); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.06em; }

        /* ── Admin card ── */
        .admin-section { max-width: 1200px; margin: -48px auto 0; padding: 0 24px 0; position: relative; z-index: 10; }
        .admin-card {
          background: white; border-radius: 24px; padding: 36px 40px;
          box-shadow: 0 20px 60px rgba(102,126,234,0.18); border: 2px solid rgba(102,126,234,0.15);
          display: flex; align-items: center; gap: 28px; flex-wrap: wrap;
        }
        .admin-avatar {
          width: 88px; height: 88px; border-radius: 50%;
          border: 4px solid #667eea; box-shadow: 0 0 0 4px rgba(102,126,234,0.15);
          object-fit: cover; flex-shrink: 0;
        }
        .admin-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: linear-gradient(135deg, #667eea, #764ba2); color: white;
          font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 4px 12px; border-radius: 50px; margin-bottom: 6px;
        }
        .admin-name { font-size: 1.4rem; font-weight: 900; color: #1e293b; margin: 0 0 4px; }
        .admin-handle { font-size: 0.9rem; color: #667eea; font-weight: 600; }
        .admin-desc { font-size: 0.88rem; color: #64748b; line-height: 1.6; margin-top: 8px; max-width: 480px; }
        .admin-link {
          margin-left: auto; display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #667eea, #764ba2); color: white;
          padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 700;
          font-size: 0.9rem; white-space: nowrap; box-shadow: 0 6px 20px rgba(102,126,234,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .admin-link:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(102,126,234,0.4); }

        /* ── Search + Filter ── */
        .contrib-controls {
          max-width: 1200px; margin: 48px auto 0; padding: 0 24px;
          display: flex; gap: 16px; flex-wrap: wrap; align-items: center;
        }
        .contrib-search-wrap { flex: 1; min-width: 260px; position: relative; }
        .contrib-search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; }
        .contrib-search {
          width: 100%; height: 52px; padding: 0 16px 0 48px; border-radius: 14px;
          border: 1.5px solid #e2e8f0; background: white; font-size: 15px; color: #1e293b;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04); outline: none; box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .contrib-search:focus { border-color: #667eea; box-shadow: 0 0 0 3px rgba(102,126,234,0.12); }
        .contrib-search::placeholder { color: #94a3b8; }
        .contrib-year-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
        .contrib-year-tab {
          height: 52px; padding: 0 22px; border-radius: 14px; font-size: 14px; font-weight: 700;
          cursor: pointer; border: 1.5px solid #e2e8f0; background: white; color: #64748b;
          transition: all 0.2s;
        }
        .contrib-year-tab:hover { border-color: #667eea; color: #667eea; }
        .contrib-year-tab.active { background: linear-gradient(135deg, #667eea, #764ba2); color: white; border-color: transparent; box-shadow: 0 4px 14px rgba(102,126,234,0.3); }

        /* ── Count line ── */
        .contrib-count-bar {
          max-width: 1200px; margin: 20px auto 0; padding: 0 24px;
          display: flex; align-items: center; gap: 12px;
        }
        .contrib-count-line { flex: 1; height: 1px; background: #e2e8f0; }
        .contrib-count-text { font-size: 13px; font-weight: 600; color: #94a3b8; white-space: nowrap; }
        .contrib-count-text span { color: #475569; }

        /* ── Grid ── */
        .contrib-grid {
          max-width: 1200px; margin: 28px auto 80px; padding: 0 24px;
          display: grid; gap: 20px;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        }
        .contrib-card {
          background: white; border-radius: 20px; border: 1px solid #e2e8f0;
          padding: 28px 20px 24px; text-align: center; cursor: default;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
          position: relative; overflow: hidden;
          display: flex; flex-direction: column; align-items: center;
        }
        .contrib-card:hover { transform: translateY(-5px); box-shadow: 0 14px 36px rgba(102,126,234,0.14); border-color: #c7d2fe; }
        .contrib-card-accent {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2, #f5576c);
          opacity: 0; transition: opacity 0.3s;
        }
        .contrib-card:hover .contrib-card-accent { opacity: 1; }
        .contrib-card-img {
          width: 72px; height: 72px; border-radius: 50%; object-fit: cover;
          border: 2px solid #e2e8f0; margin-bottom: 14px;
          transition: border-color 0.25s;
        }
        .contrib-card:hover .contrib-card-img { border-color: #818cf8; }
        .contrib-card-name { font-size: 14px; font-weight: 700; color: #1e293b; margin-bottom: 4px; line-height: 1.3; }
        .contrib-card-handle { font-size: 12px; color: #667eea; font-weight: 600; margin-bottom: 12px; }
        .contrib-card-years { display: flex; gap: 5px; justify-content: center; flex-wrap: wrap; }
        .contrib-year-pip {
          font-size: 10px; font-weight: 800; letter-spacing: 0.04em;
          padding: 2px 8px; border-radius: 50px;
        }
        .pip-2024 { background: #fef3c7; color: #d97706; }
        .pip-2026 { background: #ede9fe; color: #7c3aed; }
        .contrib-card-gh {
          margin-top: 14px; display: inline-flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 700; color: #94a3b8; text-decoration: none;
          padding: 5px 12px; border-radius: 50px; border: 1px solid #e2e8f0;
          transition: all 0.2s; background: #f8fafc;
        }
        .contrib-card-gh:hover { background: #667eea; color: white; border-color: #667eea; }

        /* ── Empty state ── */
        .contrib-empty { text-align: center; padding: 80px 24px; color: #94a3b8; }
        .contrib-empty-emoji { font-size: 3rem; margin-bottom: 12px; }
        .contrib-empty-text { font-size: 16px; font-weight: 600; color: #475569; }

        @media (max-width: 600px) {
          .admin-card { flex-direction: column; text-align: center; }
          .admin-link { margin-left: 0; }
          .contrib-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 14px; }
        }
      `}</style>

      <div className="contrib-wall-page">
        <Navbar tracking_id={[]} />

        {/* ── Hero ── */}
        <div className="contrib-wall-hero">
          <div className="contrib-wall-hero-inner">
            <div className="contrib-eyebrow">
              ❤️ Our Contributors
            </div>
            <h1 className="contrib-wall-title">
              The People Behind<br />UltimateHealth
            </h1>
            <p className="contrib-wall-sub">
              Every line of code, every bug report, every idea — they all matter.
              This is a tribute to everyone who made UltimateHealth better.
            </p>
            <div className="contrib-stat-row">
              <div className="contrib-stat-chip">
                <div className="contrib-stat-num">{totalUnique}</div>
                <div className="contrib-stat-label">Total Contributors</div>
              </div>
              <div className="contrib-stat-chip">
                <div className="contrib-stat-num">2</div>
                <div className="contrib-stat-label">Years Active</div>
              </div>
              <div className="contrib-stat-chip">
                <div className="contrib-stat-num">44</div>
                <div className="contrib-stat-label">In 2024</div>
              </div>
              <div className="contrib-stat-chip">
                <div className="contrib-stat-num">{ALL_CONTRIBUTORS.filter(c => c.years.includes(2026)).length + 1}</div>
                <div className="contrib-stat-label">In 2026</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Project Admin ── */}
        <div className="admin-section">
          <div className="admin-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PROJECT_ADMIN.img} alt={PROJECT_ADMIN.name} className="admin-avatar" />
            <div>
              <div className="admin-badge">👑 Project Admin</div>
              <div className="admin-name">{PROJECT_ADMIN.name}</div>
              <div className="admin-handle">{PROJECT_ADMIN.handle}</div>
              <p className="admin-desc">
                Founder and project maintainer of UltimateHealth. Leads the open source community,
                reviews contributions, and drives the vision of accessible health knowledge for all.
              </p>
            </div>
            <a href={PROJECT_ADMIN.url} target="_blank" rel="noopener noreferrer" className="admin-link">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.57v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub Profile
            </a>
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="contrib-controls">
          <div className="contrib-search-wrap">
            <span className="contrib-search-icon">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              className="contrib-search"
              placeholder="Search by name or GitHub handle..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="contrib-year-tabs">
            {(['all', 2024, 2026] as const).map(y => (
              <button
                key={y}
                className={`contrib-year-tab${yearFilter === y ? ' active' : ''}`}
                onClick={() => setYearFilter(y)}
              >
                {y === 'all' ? 'All Years' : `GSSoC ${y}`}
              </button>
            ))}
          </div>
        </div>

        {/* ── Count bar ── */}
        <div className="contrib-count-bar">
          <div className="contrib-count-line" />
          <span className="contrib-count-text">Showing <span>{filtered.length}</span> contributors</span>
          <div className="contrib-count-line" />
        </div>

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div className="contrib-empty">
            <div className="contrib-empty-emoji">🔍</div>
            <div className="contrib-empty-text">No contributors match your search.</div>
          </div>
        ) : (
          <div className="contrib-grid">
            {filtered.map((c) => (
              <div key={c.handle} className="contrib-card">
                <div className="contrib-card-accent" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.name} className="contrib-card-img" />
                <div className="contrib-card-name">{c.name}</div>
                <div className="contrib-card-handle">{c.handle}</div>
                <div className="contrib-card-years">
                  {c.years.includes(2024) && <span className="contrib-year-pip pip-2024">2024</span>}
                  {c.years.includes(2026) && <span className="contrib-year-pip pip-2026">2026</span>}
                </div>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="contrib-card-gh">
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.57v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub
                </a>
              </div>
            ))}
          </div>
        )}

        <Footer />
      </div>
    </>
  )
}
