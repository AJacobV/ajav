const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldProjectsCode = `          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((project) => (
              <motion.div key={project} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: project * 0.1 }} className="group relative">
                <div className="aspect-video bg-white/80 backdrop-blur-md border-2 border-gray-800 flex items-center justify-center overflow-hidden shadow-[8px_8px_0_0_#1f2937] hover:shadow-[4px_4px_0_0_#1f2937] hover:translate-y-1 hover:translate-x-1 transition-all">
                  <div className="w-16 h-16 border-4 border-dashed border-gray-800 group-hover:rotate-90 transition-transform duration-700" />
                </div>
                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-black text-black uppercase mb-1">Project {project}</h4>
                    <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">Classified UI Module</p>
                  </div>
                  <button className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>`;

const newProjectsCode = `          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "School / Side Projects", type: "Academic & Personal Modules" },
              { title: "Client Side Projects", type: "Professional Client Operations" }
            ].map((project, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group relative">
                <div className="aspect-video bg-white/20 border-2 border-gray-800 flex items-center justify-center overflow-hidden shadow-[8px_8px_0_0_#1f2937] hover:shadow-[4px_4px_0_0_#1f2937] hover:translate-y-1 hover:translate-x-1 transition-all cursor-pointer">
                  <div className="w-16 h-16 border-4 border-dashed border-gray-800 group-hover:rotate-90 transition-transform duration-700" />
                </div>
                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-black text-black uppercase mb-1">{project.title}</h4>
                    <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">{project.type}</p>
                  </div>
                  <button className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>`;

code = code.replace(oldProjectsCode, newProjectsCode);
fs.writeFileSync('src/App.tsx', code);
