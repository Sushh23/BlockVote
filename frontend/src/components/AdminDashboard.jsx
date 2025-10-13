import React, { useState } from 'react';

// --- AdminDashboard Component ---
const AdminDashboard = ({ organizations, onAddOrganization, onAddCandidate, onBack }) => {
  const [showOrgForm, setShowOrgForm] = useState(true); 
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  // Using null as initial state, let useEffect handle default selection
  const [selectedOrgId, setSelectedOrgId] = useState(null); 
  const [orgName, setOrgName] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Use the actual organizations prop
  const displayOrganizations = organizations && organizations.length > 0 ? organizations : [];

  // Set default selected organization for the candidate form
  React.useEffect(() => {
    if (displayOrganizations.length > 0 && selectedOrgId === null) {
      // Default to the first organization's ID
      setSelectedOrgId(displayOrganizations[0].id);
    }
  }, [displayOrganizations, selectedOrgId]);

  // --- Handlers (Functionality remains unchanged) ---

  const handleAddOrganization = async (e) => {
    e.preventDefault();
    if (!orgName.trim()) return;
    
    setIsProcessing(true);
    try {
      await onAddOrganization(orgName); 
      setOrgName('');
    } catch (error) {
      console.error('Error adding organization:', error);
    }
    setIsProcessing(false);
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    if (!candidateName.trim() || !selectedOrgId) return; 
    
    setIsProcessing(true);
    try {
      // Note: onAddCandidate expects (candidateName, organizationId)
      await onAddCandidate(candidateName, selectedOrgId); 
      setCandidateName('');
      // Keep selectedOrgId to allow for quick re-entry of candidates
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
    setIsProcessing(false);
  };

  // --- Rendering ---
  return (
    <div className="min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8 bg-black text-white font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Inter:wght@400;600;800&display=swap');
        
        .font-main { font-family: 'Oswald', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }

        /* Color variables for the dark, high-contrast theme */
        :root {
          --color-primary: #FF5733; 
          --color-dark-bg: #121212;
          --color-card-bg: #1A1A1A;
          --color-grid: #FF573308;
        }

        /* Grid Overlay for Aesthetic */
        .bg-grid-overlay {
          background-image: 
            linear-gradient(to right, var(--color-grid) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-grid) 1px, transparent 1px);
          background-size: 50px 50px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 0;
        }
        
        /* Card/Panel Base Style */
        .card-panel {
            background-color: var(--color-card-bg);
            border-radius: 6px;
            border: 1px solid #333333;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
            transition: all 0.3s ease;
            position: relative;
            z-index: 10;
        }

        /* Primary Accent Color */
        .text-primary-accent {
            color: var(--color-primary);
        }

        /* Primary Button */
        .btn-primary {
            background: var(--color-primary);
            color: #121212;
            padding: 0.75rem 1.5rem;
            text-transform: uppercase;
            font-weight: 700;
            border-radius: 4px;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(255, 87, 51, 0.4);
            transition: all 0.2s ease;
            text-align: center;
        }
        .btn-primary:hover:not(:disabled) {
            background: #FF7855;
            box-shadow: 0 6px 15px rgba(255, 87, 51, 0.6);
            transform: translateY(-1px);
        }
        .btn-primary:disabled {
            background: #333;
            color: #888;
            cursor: not-allowed;
            box-shadow: none;
        }

        /* Input Styles - Fixed */
        .input-style {
          background-color: #0d0d0d; /* Even darker input background */
          border: 1px solid #444444;
          padding: 12px;
          color: white;
          font-family: 'Inter', sans-serif;
          border-radius: 4px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .input-style:focus {
          border-color: var(--color-primary);
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 87, 51, 0.3); /* Ring effect */
        }
        
        /* Select arrow color adjustment */
        .select-style {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23FF5733' d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1.5em 1.5em;
        }
      `}</style>
      <div className="bg-grid-overlay"></div>

      {/* Tighter Max Width (max-w-4xl is tighter than 7xl) */}
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Back Button (Functionally it calls onBack, fixing the style issue) */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-10 text-sm uppercase font-semibold tracking-wider p-2 rounded-full hover:bg-white/5"
        >
          <svg className="w-4 h-4 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Voting Area
        </button>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center border border-[var(--color-primary)]/50">
              <svg className="w-8 h-8 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  {/* Cog Icon */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-5xl font-extrabold font-main text-white mb-1 tracking-wider">
                ADMIN CONSOLE
              </h2>
              <p className="text-gray-400 font-body">Manage voting organizations and candidates</p>
            </div>
          </div>
        </div>

        {/* Action Buttons (Add Org/Add Candidate) */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          
          {/* Add Organization Button */}
          <button
            onClick={() => { setShowCandidateForm(false); setShowOrgForm(true); }} // Changed to always show Org form when clicked
            className={`card-panel p-6 text-left transition-all group border-2 ${showOrgForm ? 'border-primary-accent shadow-lg shadow-primary-accent/30' : 'border-gray-700 hover:border-primary-accent/50'}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors border border-gray-700/50">
                <svg className={`w-6 h-6 text-primary-accent transition-colors ${showOrgForm ? 'text-white' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold mb-1 font-body text-white">
                  Add Organization
                </h3>
                <p className="text-gray-400 text-sm font-body">Create a new voting sector</p>
              </div>
            </div>
          </button>

          {/* Add Candidate Button */}
          <button
            onClick={() => { setShowOrgForm(false); setShowCandidateForm(true); }} // Changed to always show Candidate form when clicked
            className={`card-panel p-6 text-left transition-all group border-2 ${showCandidateForm ? 'border-primary-accent shadow-lg shadow-primary-accent/30' : 'border-gray-700 hover:border-primary-accent/50'}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors border border-gray-700/50">
                <svg className={`w-6 h-6 text-primary-accent transition-colors ${showCandidateForm ? 'text-white' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold mb-1 font-body text-white">
                  Add Candidate
                </h3>
                <p className="text-gray-400 text-sm font-body">Add a candidate to an organization</p>
              </div>
            </div>
          </button>
        </div>

        {/* --- FORM CONTAINER --- */}
        <div className="bg-[var(--color-dark-bg)] p-6 rounded-lg shadow-inner border border-gray-800 mb-12">
            
            {/* Add Organization Form */}
            {showOrgForm && (
              <div className="p-2">
                <h3 className="text-2xl font-bold mb-6 text-primary-accent font-main tracking-wider border-b border-gray-700 pb-3">CREATE NEW ORGANIZATION</h3>
                <form onSubmit={handleAddOrganization} className="space-y-6">
                  <div>
                    <label className="block text-gray-400 mb-2 font-body font-semibold">Organization Name</label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g., Student Senate Election, Research Board Vote"
                      className="w-full input-style rounded-lg"
                      required
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="flex gap-4 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setShowOrgForm(false)}
                      className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-700/50 transition-all font-body text-sm"
                      disabled={isProcessing}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing || !orgName.trim()}
                      className="btn-primary font-body flex items-center gap-2 text-sm"
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          PROCESSING...
                        </>
                      ) : 'ADD ORGANIZATION'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Add Candidate Form */}
            {showCandidateForm && (
              <div className="p-2">
                <h3 className="text-2xl font-bold mb-6 text-primary-accent font-main tracking-wider border-b border-gray-700 pb-3">ADD NEW CANDIDATE</h3>
                <form onSubmit={handleAddCandidate} className="space-y-6">
                  <div>
                    <label className="block text-gray-400 mb-2 font-body font-semibold">Select Organization</label>
                    <div className="relative">
                      <select
                        value={selectedOrgId || ''}
                        onChange={(e) => setSelectedOrgId(Number(e.target.value))}
                        className="w-full input-style select-style rounded-lg"
                        required
                        disabled={isProcessing || displayOrganizations.length === 0}
                      >
                        <option value="" disabled className="bg-gray-900 text-gray-500">--- Choose an organization ---</option>
                        {displayOrganizations.map((org) => (
                          <option key={org.id} value={org.id} className="bg-gray-900 text-white">
                            {org.name} (ID: {org.id})
                          </option>
                        ))}
                      </select>
                      {displayOrganizations.length === 0 && (
                        <p className="text-sm text-red-400 mt-2">No organizations available. Please create one first.</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2 font-body font-semibold">Candidate Name</label>
                    <input
                      type="text"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="e.g., Alex Johnson"
                      className="w-full input-style rounded-lg"
                      required
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="flex gap-4 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCandidateForm(false)}
                      className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-700/50 transition-all font-body text-sm"
                      disabled={isProcessing}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing || !candidateName.trim() || !selectedOrgId}
                      className="btn-primary font-body flex items-center gap-2 text-sm"
                    >
                      {isProcessing ? (
                          <>
                          <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          PROCESSING...
                          </>
                      ) : 'ADD CANDIDATE'}
                    </button>
                  </div>
                </form>
              </div>
            )}
        </div>

        {/* Organizations List */}
        <div className="card-panel p-8">
          <h3 className="text-2xl font-bold mb-6 text-white font-main tracking-wider border-b border-gray-700 pb-3">ACTIVE ORGANIZATIONS</h3>
          {displayOrganizations.length === 0 ? (
            <p className="text-gray-400 text-center py-8 font-body">No organizations added yet. Use the 'Add Organization' panel above to begin.</p>
          ) : (
            <div className="space-y-4">
              {displayOrganizations.map((org) => (
                <div 
                  key={org.id} 
                  className="card-panel p-4 border-l-4 border-l-gray-700 hover:border-l-primary-accent transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-semibold mb-1 text-white">{org.name}</h4>
                      <p className="text-gray-500 text-sm font-body">
                        Deployed with <span className="text-primary-accent font-semibold">{org.candidateCount || 0}</span> candidate(s)
                      </p>
                    </div>
                    <div className="text-sm font-body font-semibold bg-white/5 text-gray-400 px-3 py-1 rounded-full border border-gray-700">
                      ORG ID: <span className="text-white">{org.id.toString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// --- AppWrapper for Demo Purposes ---
const AppWrapper = () => {
  const [organizations, setOrganizations] = useState([
    { id: 1, name: "Student Council Election", candidateCount: 3 },
    { id: 2, name: "Department Head Vote", candidateCount: 5 },
    { id: 3, name: "Quarterly Research Budget", candidateCount: 2 },
  ]);
  
  const handleAddOrganization = (name) => {
    return new Promise(resolve => setTimeout(() => {
      const newOrg = { 
        id: organizations.length + 1, 
        name, 
        candidateCount: 0 
      };
      setOrganizations(prev => [...prev, newOrg]);
      console.log('Added organization:', newOrg);
      resolve();
    }, 1000));
  };

  const handleAddCandidate = (candidateName, orgId) => {
    return new Promise(resolve => setTimeout(() => {
      setOrganizations(prev => prev.map(org => {
        if (org.id === orgId) {
          return { ...org, candidateCount: org.candidateCount + 1 };
        }
        return org;
      }));
      console.log(`Added candidate "${candidateName}" to organization ID: ${orgId}`);
      resolve();
    }, 1000));
  };

  const handleBack = () => {
    console.log("Navigating back to main voting area (simulated)");
    // In a real app, this would change the view state in the parent component
  };

  return (
    <AdminDashboard 
      organizations={organizations} 
      onAddOrganization={handleAddOrganization} 
      onAddCandidate={handleAddCandidate} 
      onBack={handleBack} 
    />
  );
};

export default AppWrapper;
