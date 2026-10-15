import React, { useEffect, useRef, useState } from 'react';
import { SectionHeading, CascadeWrapper } from '../components/UI';
import { Phone, Mail, ArrowRight, MessageSquare } from 'lucide-react';
import * as d3 from 'd3';
import { ContactModal } from '../components/ContactModal';

const Contact = () => {
  const mapRef = useRef<SVGSVGElement>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    const svg = d3.select(mapRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    svg.attr('width', width).attr('height', height);

    // Simple world map projection (stylized)
    const projection = d3.geoMercator()
      .scale(width / 6)
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    // Load world data (using a simplified version for speed/reliability)
    d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson').then((data: any) => {
      svg.selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', 'rgba(255,255,255,0.1)')
        .attr('stroke', 'rgba(255,255,255,0.2)')
        .attr('stroke-width', 0.8)
        .on('mouseover', function() {
          d3.select(this).transition().duration(200).attr('fill', 'rgba(255,255,255,0.2)');
        })
        .on('mouseout', function() {
          d3.select(this).transition().duration(200).attr('fill', 'rgba(255,255,255,0.1)');
        });

      // Add MGC Hubs
      const hubs = [
        { name: 'Richmond, VA', coords: [-77.4360, 37.5407], color: '#ef4444' }, // red-500
        { name: 'Global Operations', coords: [10, 20], color: '#22c55e' }, // green-500
        { name: 'Strategic Sourcing', coords: [100, 15], color: '#3b82f6' } // blue-500
      ];

      svg.selectAll('circle')
        .data(hubs)
        .enter()
        .append('circle')
        .attr('cx', d => projection(d.coords as [number, number])![0])
        .attr('cy', d => projection(d.coords as [number, number])![1])
        .attr('r', 6)
        .attr('fill', d => d.color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .attr('class', 'animate-pulse');
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent viewing-angle flex flex-col justify-center pt-32 pb-24">
      {/* Full Screen Interactive Map */}
      <svg ref={mapRef} className="fixed inset-0 w-full h-full z-0 opacity-40 mix-blend-screen pointer-events-none" />

      {/* Pop-out Box */}
      <div className="relative z-10 w-full max-w-md text-center mx-auto">
        <CascadeWrapper>
          <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-12 space-y-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200/50">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl md:text-5xl font-sans font-bold text-slate-900 tracking-tight mb-4">Operational Inquiry</h2>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-6">Strategic dialogue for enterprise objectives.</p>
              <p className="text-lg font-sans text-slate-600 leading-relaxed mt-2">
                "We architect the strategic framework necessary for your global mission."
              </p>
            </div>

            <div className="space-y-8 flex flex-col items-center">
              <div className="flex items-center gap-6 group w-full justify-center">
                <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all">
                  <Mail className="w-5 h-5 text-blue-600 group-hover:text-white" />
                </div>
                <div className="text-left">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-slate-500 mb-1">Secure Communications</p>
                  <p className="text-sm font-bold text-slate-800 tracking-widest">contact@miltongroupsecurity.org</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group w-full justify-center">
                <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-600 transition-all">
                  <Phone className="w-5 h-5 text-green-600 group-hover:text-white" />
                </div>
                <div className="text-left">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-slate-500 mb-1">Operational Support</p>
                  <p className="text-sm font-bold text-slate-800 tracking-widest">804-760-5797</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="w-full py-6 bg-blue-600 text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-blue-700 transition-all duration-300 rounded-full shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 flex items-center justify-center gap-4 group"
              >
                Contact MGC <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </CascadeWrapper>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default Contact;
