"use client";
import Container from '@/components/common/Container';
import { Link } from 'next-view-transitions';
import React from 'react'

const page = () => {
  return (
    <Container>
      <Fifa2026Dashboard />
    </Container>
  )
}

export default page

interface SskillProps {
  name: string;
  href: string;
  children: React.ReactNode;
}

export const Sskill = ({name,href, children}:SskillProps)=>{
    return (
      <Link 
        href={href ?? ''}
        target="_blank"
        className="skill-inner-shadow inline-flex items-center self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-1 text-sm text-black dark:border-white/30 dark:bg-white/15 dark:text-white hover:cursor-pointer hover:bg-black/10 hover:text-black dark:hover:bg-white/20 dark:hover:text-white hover:cursor-zoom-in  transition-colors"
        >
        <div className="size-4 flex-shrink-0">{children}</div>
        <p className="ml-1 text-sm font-bold">{name}</p>
        </Link>
    )
}


import  { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, MapPin, Users, Trophy, Clock, Search } from 'lucide-react';

// Mock Data for Tournament Breakdown
const venuesData = [
  { name: 'United States', matches: 78, color: '#1e3a8a' },
  { name: 'Mexico', matches: 13, color: '#065f46' },
  { name: 'Canada', matches: 13, color: '#991b1b' },
];

const formatData = [
  { name: 'Groups', count: 12 },
  { name: 'Teams per Group', count: 4 },
  { name: 'Total Teams', count: 48 },
  { name: 'Total Matches', count: 104 },
];

// Sample Highlight Matches with converted Indian Standard Time (IST)
const sampleMatches = [
  {
    id: 1,
    stage: 'Opening Match (Group A)',
    stadium: 'Estadio Azteca, Mexico City',
    teams: 'Mexico vs TBD',
    localTime: 'June 11, 2026 - 19:00 Local',
    istTime: 'June 12, 2026 - 05:30 AM IST',
    type: 'Early Morning'
  },
  {
    id: 2,
    stage: 'Group Stage (USA Opening)',
    stadium: 'SoFi Stadium, Los Angeles',
    teams: 'USA vs TBD',
    localTime: 'June 12, 2026 - 18:00 Local',
    istTime: 'June 13, 2026 - 06:30 AM IST',
    type: 'Early Morning'
  },
  {
    id: 3,
    stage: 'Round of 32 Opening',
    stadium: 'MetLife Stadium, New York/New Jersey',
    teams: 'TBD vs TBD',
    localTime: 'June 28, 2026 - 21:00 Local',
    istTime: 'June 29, 2026 - 06:30 AM IST',
    type: 'Early Morning'
  },
  {
    id: 4,
    stage: 'Quarter-Final',
    stadium: 'Hard Rock Stadium, Miami',
    teams: 'TBD vs TBD',
    localTime: 'July 11, 2026 - 15:00 Local',
    istTime: 'July 12, 2026 - 12:30 AM IST',
    type: 'Midnight'
  },
  {
    id: 5,
    stage: 'Semi-Final 1',
    stadium: 'AT&T Stadium, Dallas',
    teams: 'TBD vs TBD',
    localTime: 'July 14, 2026 - 19:00 Local',
    istTime: 'July 15, 2026 - 05:30 AM IST',
    type: 'Early Morning'
  },
  {
    id: 6,
    stage: 'World Cup Final',
    stadium: 'MetLife Stadium, New York/New Jersey',
    teams: 'TBD vs TBD',
    localTime: 'July 19, 2026 - 16:00 Local',
    istTime: 'July 20, 2026 - 01:30 AM IST',
    type: 'Midnight'
  },
];

export  function Fifa2026Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMatches = sampleMatches.filter(match =>
    match.stage.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.stadium.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.teams.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen   p-6 font-sans">
      {/* Header section */}
      <header className="max-w-7xl mx-auto mb-8 border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase bg-emerald-500/10 px-3 py-1 rounded-full">
            Tournament Hub
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">
            FIFA World Cup 2026™ Dashboard
          </h1>
          <p className="text-slate-400 mt-1">
            Host Nations: United States, Mexico, & Canada • Optimized for Indian Standard Time (IST)
          </p>
        </div>
        <div className="flex gap-4 items-center bg-slate-800 p-3 rounded-xl border border-slate-700 text-sm">
          <Clock className="text-emerald-400 w-5 h-5 animate-pulse" />
          <div>
            <p className="font-semibold ">Timezone Active</p>
            <p className="text-emerald-400 text-xs font-mono">Asia/Kolkata (GMT+5:30)</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        
        {/* Metric Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
          <div className=" border border-slate-700/60 p-5 rounded-2xl flex items-center gap-4 overflow-hidden">
            <div className="p-3 text-blue-400 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total Teams</p>
              <p className="text-2xl font-bold  mt-0.5">48 Teams</p>
              <p className="text-slate-500 text-xs mt-0.5">Expanded from 32 teams</p>
            </div>
          </div>

          <div className=" border border-slate-700/60 p-5 rounded-2xl flex items-center gap-4 flex-wrap">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total Matches</p>
              <p className="text-2xl font-bold  mt-0.5">104 Matches</p>
              <p className="text-slate-500 text-xs mt-0.5">Played across 39 days</p>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl flex flex-wrap items-center gap-4">
            <div className="p-3 bg-red-500/10 text-red-400 rounded-xl">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Host Venues</p>
              <p className="text-2xl font-bold  mt-0.5">16 Cities</p>
              <p className="text-slate-500 text-xs mt-0.5">3 Countries combined</p>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl flex flex-wrap items-center gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Tournament Dates</p>
              <p className="text-lg font-bold  mt-0.5">June 11 – July 19</p>
              <p className="text-amber-400/80 text-xs font-mono mt-0.5">2026 Summer Schedule</p>
            </div>
          </div>
        </section>

        {/* Graphs Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Match allocation per country */}
          <div className="bg-slate-800/40 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold  mb-1">Match Distribution by Host Country</h3>
            <p className="text-slate-400 text-xs mb-6">Visual breakdown of where the 104 matches are allocated</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={venuesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="matches" radius={[8, 8, 0, 0]}>
                    {venuesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Structural Format breakdown */}
          <div className="bg-slate-800/40 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold  mb-1">New Expanded Format Breakdown</h3>
            <p className="text-slate-400 text-xs mb-6">Structural quantities inside the new 48-team layout</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formatData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {formatData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#6366f1', '#10b981', '#f59e0b', '#ec4899'][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mt-2 text-xs">
                {formatData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'][index % 4] }}></span>
                    <span className="">{entry.name}: <strong className="">{entry.count}</strong></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Schedule & IST Time Converter Section */}
        <section className="border border-slate-800 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold ">Key Fixtures (Indian Standard Time - IST)</h3>
              <p className="text-slate-400 text-xs mt-0.5">
                North American timezone matches converted to Indian matching dates and times.
              </p>
            </div>
            
            {/* Search filter input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search stage, stadium..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Matches Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMatches.length > 0 ? (
              filteredMatches.map((match) => (
                <div key={match.id} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex flex-col justify-between hover:border-slate-700 transition-all duration-200">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase bg-emerald-500/10 px-2 py-0.5 rounded">
                        {match.stage}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                        match.type === 'Midnight' ? 'bg-purple-500/10 text-purple-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {match.type} Kickoff in India
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-100 my-1">{match.teams}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" /> {match.stadium}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="text-[10px] text-slate-500 font-medium uppercase">Local Venue Time</p>
                      <p className="text-xs text-slate-400 font-mono">{match.localTime}</p>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-right sm:text-right">
                      <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Indian Time (IST)</p>
                      <p className="text-sm font-bold text-white font-mono">{match.istTime.replace(' IST', '')} <span className="text-emerald-400 text-xs font-sans ml-0.5">IST</span></p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-500 text-sm">
                No stages or stadiums matching "{searchTerm}" found.
              </div>
            )}
          </div>
        </section>
        
      </main>
    </div>
  );
}