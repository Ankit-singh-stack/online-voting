import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useVote } from '../../context/VoteContext';
import { 
  FaArrowLeft, FaSave, FaPlus, FaTrash, FaUpload,
  FaCalendarAlt, FaAlignLeft, FaUserPlus, FaImage,
  FaCheckCircle, FaTimes, FaEdit, FaRegClock,
  FaChartLine, FaUsers, FaVoteYea
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const CreateElection = () => {
  const navigate = useNavigate();
  const { addElection } = useVote();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '17:00',
    electionType: 'public',
    category: 'general',
    location: 'Online',
    maxVoters: '',
    minAge: 18,
    eligibility: 'all',
    candidates: [],
    rules: [],
    banner: null,
    featured: false,
    allowAbstention: true,
    showResults: 'after_end',
    requireVerification: true
  });

  const [newCandidate, setNewCandidate] = useState({
    name: '',
    party: '',
    symbol: '',
    bio: '',
    image: null,
    manifesto: '',
    experience: '',
    education: ''
  });

  const [newRule, setNewRule] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const steps = [
    { number: 1, title: 'Basic Info', icon: <FaAlignLeft /> },
    { number: 2, title: 'Schedule', icon: <FaCalendarAlt /> },
    { number: 3, title: 'Candidates', icon: <FaUserPlus /> },
    { number: 4, title: 'Settings', icon: <FaRegClock /> },
    { number: 5, title: 'Preview', icon: <FaChartLine /> }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddCandidate = () => {
    if (!newCandidate.name || !newCandidate.party) {
      toast.error('Please fill in candidate name and party');
      return;
    }

    const candidate = {
      id: Date.now(),
      ...newCandidate,
      symbol: newCandidate.symbol || getRandomSymbol()
    };

    setFormData(prev => ({
      ...prev,
      candidates: [...prev.candidates, candidate]
    }));

    setNewCandidate({
      name: '',
      party: '',
      symbol: '',
      bio: '',
      image: null,
      manifesto: '',
      experience: '',
      education: ''
    });

    toast.success('Candidate added successfully');
  };

  const handleRemoveCandidate = (candidateId) => {
    setFormData(prev => ({
      ...prev,
      candidates: prev.candidates.filter(c => c.id !== candidateId)
    }));
    toast.success('Candidate removed');
  };

  const handleAddRule = () => {
    if (!newRule.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      rules: [...prev.rules, newRule]
    }));
    setNewRule('');
  };

  const handleRemoveRule = (index) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'banner') {
          setFormData(prev => ({ ...prev, banner: reader.result }));
        } else if (type === 'candidate') {
          setNewCandidate(prev => ({ ...prev, image: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getRandomSymbol = () => {
    const symbols = ['🌟', '🌿', '⚡', '💎', '🌊', '🔥', '⭐', '🌈', '🦅', '🌙'];
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const validateStep = (step) => {
    switch(step) {
      case 1:
        if (!formData.title) {
          toast.error('Please enter election title');
          return false;
        }
        if (!formData.description) {
          toast.error('Please enter election description');
          return false;
        }
        return true;
      case 2:
        if (!formData.startDate || !formData.endDate) {
          toast.error('Please select start and end dates');
          return false;
        }
        if (new Date(formData.startDate) >= new Date(formData.endDate)) {
          toast.error('End date must be after start date');
          return false;
        }
        return true;
      case 3:
        if (formData.candidates.length < 2) {
          toast.error('Please add at least 2 candidates');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    // Validate all steps
    for (let i = 1; i <= steps.length; i++) {
      if (!validateStep(i)) {
        setCurrentStep(i);
        return;
      }
    }

    // Create election object
    const electionData = {
      ...formData,
      id: Date.now(),
      status: 'upcoming',
      createdAt: new Date().toISOString(),
      createdBy: 'admin',
      totalVoters: 0,
      voterTurnout: 0,
      isActive: false
    };

    addElection(electionData);
    toast.success('Election created successfully!');
    navigate('/admin/elections');
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Election Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g., Presidential Election 2026"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="input-field"
                placeholder="Describe the purpose and details of this election..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Election Type
                </label>
                <select
                  name="electionType"
                  value={formData.electionType}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="public">Public Election</option>
                  <option value="private">Private Election</option>
                  <option value="corporate">Corporate Election</option>
                  <option value="student">Student Election</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="general">General Election</option>
                  <option value="presidential">Presidential</option>
                  <option value="parliamentary">Parliamentary</option>
                  <option value="local">Local Election</option>
                  <option value="referendum">Referendum</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g., Online / New York City Hall"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Election Banner
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'banner')}
                  className="hidden"
                  id="banner-upload"
                />
                <label htmlFor="banner-upload" className="cursor-pointer">
                  {formData.banner ? (
                    <img src={formData.banner} alt="Banner" className="max-h-40 mx-auto rounded-lg" />
                  ) : (
                    <div>
                      <FaUpload className="text-4xl text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">Click to upload banner image</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule & Timeline</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="input-field"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="input-field"
                  min={formData.startDate}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-blue-800 mb-3">Timeline Preview</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <FaRegClock className="text-blue-600 mr-2" />
                  <span className="text-gray-600">Starts: </span>
                  <span className="ml-2 font-semibold">
                    {formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'Not set'} at {formData.startTime}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <FaRegClock className="text-red-600 mr-2" />
                  <span className="text-gray-600">Ends: </span>
                  <span className="ml-2 font-semibold">
                    {formData.endDate ? new Date(formData.endDate).toLocaleDateString() : 'Not set'} at {formData.endTime}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <FaChartLine className="text-green-600 mr-2" />
                  <span className="text-gray-600">Duration: </span>
                  <span className="ml-2 font-semibold">
                    {formData.startDate && formData.endDate ? 
                      Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) + ' days' 
                      : 'Not calculated'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label className="ml-2 text-sm text-gray-700">
                Feature this election on homepage
              </label>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Candidates</h2>

            {/* Add Candidate Form */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">New Candidate</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate Name
                  </label>
                  <input
                    type="text"
                    value={newCandidate.name}
                    onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
                    className="input-field"
                    placeholder="Enter candidate name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Party
                  </label>
                  <input
                    type="text"
                    value={newCandidate.party}
                    onChange={(e) => setNewCandidate({...newCandidate, party: e.target.value})}
                    className="input-field"
                    placeholder="Enter party name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Symbol (Emoji)
                  </label>
                  <input
                    type="text"
                    value={newCandidate.symbol}
                    onChange={(e) => setNewCandidate({...newCandidate, symbol: e.target.value})}
                    className="input-field"
                    placeholder="e.g., 🌟"
                    maxLength="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'candidate')}
                    className="hidden"
                    id="candidate-image"
                  />
                  <label
                    htmlFor="candidate-image"
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100"
                  >
                    <FaImage className="mr-2" />
                    Upload Photo
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biography
                  </label>
                  <textarea
                    value={newCandidate.bio}
                    onChange={(e) => setNewCandidate({...newCandidate, bio: e.target.value})}
                    rows="3"
                    className="input-field"
                    placeholder="Enter candidate biography"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manifesto
                  </label>
                  <textarea
                    value={newCandidate.manifesto}
                    onChange={(e) => setNewCandidate({...newCandidate, manifesto: e.target.value})}
                    rows="3"
                    className="input-field"
                    placeholder="Enter candidate manifesto"
                  />
                </div>
              </div>

              <button
                onClick={handleAddCandidate}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center"
              >
                <FaPlus className="mr-2" />
                Add Candidate
              </button>
            </div>

            {/* Candidates List */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Added Candidates ({formData.candidates.length})</h3>
              
              {formData.candidates.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No candidates added yet</p>
              ) : (
                formData.candidates.map((candidate, index) => (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl text-white mr-4">
                        {candidate.symbol}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                        <p className="text-sm text-gray-600">{candidate.party}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveCandidate(candidate.id)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <FaTrash />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Voters
                </label>
                <input
                  type="number"
                  name="maxVoters"
                  value={formData.maxVoters}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Leave empty for unlimited"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Age Requirement
                </label>
                <input
                  type="number"
                  name="minAge"
                  value={formData.minAge}
                  onChange={handleInputChange}
                  className="input-field"
                  min="0"
                  max="120"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Eligibility
              </label>
              <select
                name="eligibility"
                value={formData.eligibility}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="all">All registered voters</option>
                <option value="verified">Verified voters only</option>
                <option value="age">Age-restricted</option>
                <option value="location">Location-restricted</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                When to show results
              </label>
              <select
                name="showResults"
                value={formData.showResults}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="after_end">After election ends</option>
                <option value="real_time">Real-time during voting</option>
                <option value="admin_only">Admin only until published</option>
              </select>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Voting Rules</h3>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="allowAbstention"
                  checked={formData.allowAbstention}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Allow voters to abstain (vote for none)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="requireVerification"
                  checked={formData.requireVerification}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Require additional verification for voting
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Rules
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                  className="flex-1 input-field rounded-r-none"
                  placeholder="Add a custom rule..."
                />
                <button
                  onClick={handleAddRule}
                  className="bg-blue-600 text-white px-4 rounded-r-xl hover:bg-blue-700"
                >
                  <FaPlus />
                </button>
              </div>
              
              <div className="space-y-2">
                {formData.rules.map((rule, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <span className="text-sm">{rule}</span>
                    <button
                      onClick={() => handleRemoveRule(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview & Confirm</h2>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">{formData.title || 'Election Title'}</h3>
              <p className="text-white/90 mb-6">{formData.description || 'Election description will appear here'}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-white/70 text-sm">Start Date</p>
                  <p className="font-semibold">{formData.startDate || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">End Date</p>
                  <p className="font-semibold">{formData.endDate || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Candidates</p>
                  <p className="font-semibold">{formData.candidates.length}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Type</p>
                  <p className="font-semibold capitalize">{formData.electionType}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Candidates</h3>
                <div className="space-y-3">
                  {formData.candidates.map((candidate, index) => (
                    <div key={candidate.id} className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        {candidate.symbol}
                      </div>
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-sm text-gray-500">{candidate.party}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Election Rules</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    Minimum age: {formData.minAge}+
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    {formData.allowAbstention ? 'Abstention allowed' : 'Abstention not allowed'}
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    Results: {formData.showResults.replace('_', ' ')}
                  </li>
                  {formData.rules.map((rule, index) => (
                    <li key={index} className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-yellow-800 text-sm">
                Please review all information carefully before creating the election. 
                Once created, some settings cannot be modified.
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/admin/elections')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeft className="mr-2" />
            Back to Elections
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Election</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex flex-col items-center ${
                  step.number <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step.number <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.icon}
                </div>
                <span className="text-xs font-medium">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
            <div
              className="absolute top-0 left-0 h-1 bg-blue-600 transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-xl ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            
            {currentStep === steps.length ? (
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-2 rounded-xl hover:shadow-lg flex items-center"
              >
                <FaSave className="mr-2" />
                Create Election
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-2 rounded-xl hover:shadow-lg"
              >
                Next Step
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center">
            <FaUsers className="text-blue-600 text-xl mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{formData.candidates.length}</p>
            <p className="text-sm text-gray-500">Candidates</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <FaRegClock className="text-green-600 text-xl mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {formData.startDate && formData.endDate ? 
                Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) : 0}
            </p>
            <p className="text-sm text-gray-500">Days Duration</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <FaVoteYea className="text-purple-600 text-xl mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{formData.rules.length}</p>
            <p className="text-sm text-gray-500">Rules Set</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateElection;