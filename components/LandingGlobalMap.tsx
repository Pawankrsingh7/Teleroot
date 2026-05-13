"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Activity, 
  AlertTriangle, 
  Zap, 
  ShieldCheck
} from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker, Line, ZoomableGroup } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Map Nodes (Coordinates: [Longitude, Latitude])
const nodes = [
  { id: "nyc", name: "New York", coordinates: [-74.006, 40.7128], status: "healthy" },
  { id: "lon", name: "London", coordinates: [-0.1276, 51.5074], status: "healthy" },
  { id: "fra", name: "Frankfurt", coordinates: [8.6821, 50.1109], status: "healthy" },
  { id: "dxb", name: "Dubai", coordinates: [55.2708, 25.2048], status: "healthy" },
  { id: "sin", name: "Singapore", coordinates: [103.8198, 1.3521], status: "healthy" },
  { id: "syd", name: "Sydney", coordinates: [151.2093, -33.8688], status: "healthy" },
  { id: "tyo", name: "Tokyo", coordinates: [139.6917, 35.6895], status: "issue" }, // The issue node
  { id: "sfo", name: "San Francisco", coordinates: [-122.4194, 37.7749], status: "healthy" },
  { id: "gru", name: "São Paulo", coordinates: [-46.6333, -23.5505], status: "healthy" },
  { id: "cpt", name: "Cape Town", coordinates: [18.4232, -33.9249], status: "healthy" },
  { id: "bom", name: "Mumbai", coordinates: [72.8777, 19.0760], status: "healthy" },
  { id: "hkg", name: "Hong Kong", coordinates: [114.1694, 22.3193], status: "healthy" },
  { id: "tor", name: "Toronto", coordinates: [-79.3832, 43.6532], status: "healthy" },
  { id: "par", name: "Paris", coordinates: [2.3522, 48.8566], status: "healthy" },
];

// Connections between nodes
const connections = [
  { from: "sfo", to: "nyc" },
  { from: "nyc", to: "lon" },
  { from: "nyc", to: "gru" },
  { from: "nyc", to: "tor" },
  { from: "tor", to: "sfo" },
  { from: "lon", to: "fra" },
  { from: "lon", to: "par" },
  { from: "par", to: "fra" },
  { from: "fra", to: "dxb" },
  { from: "dxb", to: "bom" },
  { from: "bom", to: "sin" },
  { from: "sin", to: "hkg" },
  { from: "hkg", to: "tyo" },
  { from: "tyo", to: "sfo" },
  { from: "sin", to: "syd" },
  { from: "gru", to: "cpt" },
  { from: "cpt", to: "dxb" },
];

export function LandingGlobalMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>("tyo");
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <section className="bg-white py-16 overflow-hidden border-b border-slate-100">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
          
          {/* Left Column - Content */}
          <div className="lg:w-[35%] flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 mb-4">
                <Globe className="h-4 w-4 text-[#1F2C30]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1F2C30]">
                  Global Intelligence
                </span>
                <div className="h-2 w-2 rounded-full bg-[#41bf63]" />
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight text-[#1F2C30] sm:text-4xl mb-4">
                Real-Time Global Resilience Map
              </h2>
              
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Monitor the health of your entire network infrastructure across the globe. AI detects issues, predicts impact, and takes autonomous actions to keep your systems resilient, everywhere.
              </p>
            </div>

            <div className="flex flex-col gap-5 mt-2">
              {[
                {
                  icon: <Globe className="h-4 w-4 text-[#41bf63]" />,
                  title: "Global Visibility",
                  desc: "Real-time monitoring of your entire infrastructure across all regions."
                },
                {
                  icon: <Activity className="h-4 w-4 text-[#41bf63]" />,
                  title: "AI-Powered Detection",
                  desc: "Machine learning identifies anomalies before they impact your users."
                },
                {
                  icon: <Zap className="h-4 w-4 text-[#41bf63]" />,
                  title: "Autonomous Response",
                  desc: "AI takes instant action to heal, reroute, and optimize performance."
                },
                {
                  icon: <ShieldCheck className="h-4 w-4 text-[#41bf63]" />,
                  title: "Built for Resilience",
                  desc: "Intelligent infrastructure designed to stay strong, always."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="flex-shrink-0 mt-0.5 h-8 w-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:border-[#41bf63]/30 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#1F2C30] mb-0.5">{item.title}</h4>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Map & Stats */}
          <div className="lg:w-[65%] flex flex-col gap-5">
            
            {/* Top Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white rounded-2xl border border-slate-100 p-3 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-[#41bf63]" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Global Health</p>
                  <p className="text-base font-black text-[#1F2C30] leading-tight">98.7%</p>
                  <p className="text-[9px] text-slate-500">Excellent</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                  <Globe className="h-4 w-4 text-[#41bf63]" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Regions Online</p>
                  <p className="text-base font-black text-[#1F2C30] leading-tight">24 / 26</p>
                  <p className="text-[9px] text-slate-500">92%</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-amber-50 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Active Issues</p>
                  <p className="text-base font-black text-[#1F2C30] leading-tight">1</p>
                  <p className="text-[9px] text-slate-500">-2 from yesterday</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-[#41bf63]" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">AI Actions</p>
                  <p className="text-base font-black text-[#1F2C30] leading-tight">12</p>
                  <p className="text-[9px] text-slate-500">Today</p>
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative rounded-3xl bg-[#09160e] border border-[#1a3022] overflow-hidden shadow-2xl h-[400px] flex items-center justify-center">
              
              {/* Pattern definition for dotted map effect */}
              <svg style={{ position: "absolute", width: 0, height: 0 }}>
                <defs>
                  <pattern id="dots" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                    <circle fill="#264531" cx="2" cy="2" r="1"></circle>
                  </pattern>
                </defs>
              </svg>

              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 120, center: [0, 20] }}
                className="w-full h-full opacity-80"
              >
                <ZoomableGroup zoom={1} maxZoom={4} center={[0, 20]}>
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="url(#dots)"
                          stroke="#0d1f14"
                          strokeWidth={0.5}
                          onMouseEnter={() => {
                            const name = geo.properties.name || geo.properties.NAME;
                            setHoveredCountry(name);
                          }}
                          onMouseLeave={() => {
                            setHoveredCountry(null);
                          }}
                          style={{
                            default: { outline: "none" },
                            hover: { outline: "none", fill: "#264531" },
                            pressed: { outline: "none" },
                          }}
                        />
                      ))
                    }
                  </Geographies>

                  {/* Draw Lines */}
                  {connections.map(({ from, to }, idx) => {
                    const fromNode = nodes.find(n => n.id === from);
                    const toNode = nodes.find(n => n.id === to);
                    if (!fromNode || !toNode) return null;
                    
                    const isIssueRoute = fromNode.status === 'issue' || toNode.status === 'issue';

                    return (
                      <Line
                        key={`line-${idx}`}
                        from={fromNode.coordinates as [number, number]}
                        to={toNode.coordinates as [number, number]}
                        stroke={isIssueRoute ? "#ef4444" : "#41bf63"}
                        strokeWidth={1}
                        strokeLinecap="round"
                        style={{
                          opacity: isIssueRoute ? 0.3 : 0.4,
                        }}
                      />
                    );
                  })}

                  {/* Draw Nodes */}
                  {nodes.map((node) => {
                    const isIssue = node.status === "issue";
                    
                    return (
                      <Marker 
                        key={node.id} 
                        coordinates={node.coordinates as [number, number]}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(node.id)}
                      >
                        {/* Pulse effect */}
                        <circle
                          r={isIssue ? 12 : 6}
                          fill={isIssue ? "#ef4444" : "#41bf63"}
                          opacity={0.2}
                          className="animate-ping"
                        />
                        
                        <circle
                          r={isIssue ? 4 : 2}
                          fill={isIssue ? "#ef4444" : "#41bf63"}
                          stroke="#09160e"
                          strokeWidth={1}
                        />

                        {/* Tooltip Overlay for Issue Node */}
                        {isIssue && (
                          <g>
                            <foreignObject x="15" y="-60" width="220" height="120" className="overflow-visible pointer-events-none">
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl shadow-xl border border-slate-100 p-3 flex flex-col gap-2"
                              >
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="h-4 w-4 text-red-500" />
                                  <span className="text-[11px] font-bold text-red-500">Issue Detected</span>
                                </div>
                                <p className="text-[10px] text-slate-600 font-medium leading-tight pb-2 border-b border-slate-100">
                                  High latency detected in {node.name}.
                                </p>
                                <div className="flex items-start gap-2 pt-1">
                                  <Zap className="h-3 w-3 text-[#41bf63] mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="text-[10px] font-bold text-[#1F2C30] block">AI Action</span>
                                    <span className="text-[10px] text-slate-500">Autonomous reroute in progress...</span>
                                  </div>
                                </div>
                              </motion.div>
                            </foreignObject>
                          </g>
                        )}
                      </Marker>
                    );
                  })}
                </ZoomableGroup>
              </ComposableMap>

              {/* Country Name Tooltip */}
              <AnimatePresence>
                {hoveredCountry && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full z-50 pointer-events-none"
                  >
                    <span className="text-xs font-black text-white uppercase tracking-widest">{hoveredCountry}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Map Legend */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-4 bg-[#06100a]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 w-max max-w-[90%]">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-transparent border-[1.5px] border-[#41bf63] flex items-center justify-center">
                    <div className="h-[3px] w-[3px] bg-[#41bf63] rounded-full" />
                  </div>
                  <span className="text-[9px] font-semibold text-white uppercase tracking-wider">Healthy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-transparent border-[1.5px] border-amber-400 flex items-center justify-center">
                    <div className="h-[3px] w-[3px] bg-amber-400 rounded-full" />
                  </div>
                  <span className="text-[9px] font-semibold text-white uppercase tracking-wider">Degraded</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-transparent border-[1.5px] border-red-500 flex items-center justify-center">
                    <div className="h-[3px] w-[3px] bg-red-500 rounded-full" />
                  </div>
                  <span className="text-[9px] font-semibold text-white uppercase tracking-wider">Issue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-px w-4 bg-[#41bf63] opacity-60" />
                  <span className="text-[9px] font-semibold text-white uppercase tracking-wider">Link</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
