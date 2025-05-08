import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Policy } from '../../types';
import { mockPolicies } from '../../data/mockData';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  FileText, 
  MessageSquare, 
  ThumbsUp, 
  Users 
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const EtiquetteHub = () => {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <Routes>
        <Route path="/" element={<EtiquetteOverview />} />
        <Route path="/policies" element={<PoliciesList />} />
        <Route path="/policies/:id" element={<PolicyDetail />} />
        <Route path="/feedback" element={<EtiquetteFeedback />} />
        <Route path="/kudos" element={<KudosCenter />} />
      </Routes>
    </div>
  );
};

const EtiquetteOverview = () => {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState<Policy[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setPolicies(mockPolicies);
  }, []);
  
  const pendingPolicies = policies.filter(p => !p.acknowledged);
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Etiquette Hub</h1>
      
      {pendingPolicies.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Clock className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-700">
                You have {pendingPolicies.length} pending {pendingPolicies.length === 1 ? 'policy' : 'policies'} to acknowledge.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div 
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate('/etiquette/policies')}
        >
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-blue-100">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold ml-3">Company Policies</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Review and acknowledge company policies and guidelines.
          </p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">{policies.length} Policies</span>
            <span className="text-blue-600">
              {pendingPolicies.length} Pending
            </span>
          </div>
        </div>
        
        <div 
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate('/etiquette/feedback')}
        >
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-purple-100">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold ml-3">Etiquette Feedback</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Provide or request feedback on workplace etiquette and behavior.
          </p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Anonymous Options</span>
            <span className="text-purple-600">Give Feedback</span>
          </div>
        </div>
        
        <div 
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate('/etiquette/kudos')}
        >
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-amber-100">
              <ThumbsUp className="h-6 w-6 text-amber-600" />
            </div>
            <h2 className="text-lg font-semibold ml-3">Kudos Center</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Recognize colleagues for positive behaviors and contributions.
          </p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">12 Received</span>
            <span className="text-amber-600">Send Kudos</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BookOpen className="mr-2 text-teal-600" size={20} />
          Etiquette Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <h3 className="font-medium text-gray-800 mb-2">Communication Guidelines</h3>
            <p className="text-gray-600 text-sm mb-3">
              Best practices for effective and respectful communication in the workplace.
            </p>
            <Link to="#" className="text-blue-600 text-sm hover:text-blue-800">
              Read more →
            </Link>
          </div>
          <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <h3 className="font-medium text-gray-800 mb-2">Meeting Etiquette</h3>
            <p className="text-gray-600 text-sm mb-3">
              Guidelines for productive and respectful participation in meetings.
            </p>
            <Link to="#" className="text-blue-600 text-sm hover:text-blue-800">
              Read more →
            </Link>
          </div>
          <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <h3 className="font-medium text-gray-800 mb-2">Remote Work Etiquette</h3>
            <p className="text-gray-600 text-sm mb-3">
              Best practices for maintaining professionalism in remote work settings.
            </p>
            <Link to="#" className="text-blue-600 text-sm hover:text-blue-800">
              Read more →
            </Link>
          </div>
          <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <h3 className="font-medium text-gray-800 mb-2">Diversity & Inclusion</h3>
            <p className="text-gray-600 text-sm mb-3">
              Guidelines for fostering an inclusive and respectful workplace environment.
            </p>
            <Link to="#" className="text-blue-600 text-sm hover:text-blue-800">
              Read more →
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Users className="mr-2 text-indigo-600" size={20} />
          Etiquette Champions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-blue-100 mx-auto mb-2 flex items-center justify-center text-blue-600 font-semibold text-lg">
              JD
            </div>
            <p className="font-medium text-gray-800">John Doe</p>
            <p className="text-sm text-gray-500">15 Kudos Received</p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-purple-100 mx-auto mb-2 flex items-center justify-center text-purple-600 font-semibold text-lg">
              JS
            </div>
            <p className="font-medium text-gray-800">Jane Smith</p>
            <p className="text-sm text-gray-500">12 Kudos Received</p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-green-100 mx-auto mb-2 flex items-center justify-center text-green-600 font-semibold text-lg">
              AJ
            </div>
            <p className="font-medium text-gray-800">Alice Johnson</p>
            <p className="text-sm text-gray-500">10 Kudos Received</p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-amber-100 mx-auto mb-2 flex items-center justify-center text-amber-600 font-semibold text-lg">
              BW
            </div>
            <p className="font-medium text-gray-800">Bob Wilson</p>
            <p className="text-sm text-gray-500">8 Kudos Received</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PoliciesList = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'acknowledged'
  
  useEffect(() => {
    // In a real app, this would be an API call
    setPolicies(mockPolicies);
  }, []);
  
  const filteredPolicies = policies.filter(policy => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !policy.acknowledged;
    if (filter === 'acknowledged') return policy.acknowledged;
    return true;
  });
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Company Policies</h1>
          <p className="text-gray-600 mt-1">
            Review and acknowledge company policies and guidelines
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                filter === 'pending'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-r border-gray-300`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                filter === 'acknowledged'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-r border-gray-300`}
              onClick={() => setFilter('acknowledged')}
            >
              Acknowledged
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {filteredPolicies.map(policy => (
            <li key={policy.id} className="hover:bg-gray-50">
              <Link to={`/etiquette/policies/${policy.id}`} className="block">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {policy.title}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      {policy.acknowledged ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Acknowledged
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                          <Clock className="h-4 w-4 mr-1" />
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {policy.description}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        Updated: {new Date(policy.updatedAt).toLocaleDateString()}
                      </p>
                      <p className="ml-2 text-gray-400">•</p>
                      <p className="ml-2">
                        Version {policy.version}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
          
          {filteredPolicies.length === 0 && (
            <li className="py-8 text-center text-gray-500">
              No policies found matching your filter.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

const PolicyDetail = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [isAcknowledging, setIsAcknowledging] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an API call using the ID from params
    // For demo, just use the first policy
    setPolicy(mockPolicies[0]);
  }, []);
  
  const handleAcknowledge = () => {
    setIsAcknowledging(true);
    
    // Simulate API call
    setTimeout(() => {
      if (policy) {
        const updatedPolicy = {
          ...policy,
          acknowledged: true,
          acknowledgedAt: new Date().toISOString()
        };
        setPolicy(updatedPolicy);
        
        addToast({
          type: 'success',
          title: 'Policy Acknowledged',
          message: `You have successfully acknowledged the ${policy.title} policy.`
        });
      }
      setIsAcknowledging(false);
    }, 1000);
  };
  
  if (!policy) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/etiquette/policies')}
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
        >
          ← Back to Policies
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{policy.title}</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{policy.description}</p>
            </div>
            {policy.acknowledged ? (
              <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                <CheckCircle className="h-4 w-4 mr-1" />
                Acknowledged on {new Date(policy.acknowledgedAt!).toLocaleDateString()}
              </span>
            ) : (
              <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                <Clock className="h-4 w-4 mr-1" />
                Pending Acknowledgment
              </span>
            )}
          </div>
        </div>
        
        <div className="px-4 py-5 sm:px-6">
          <div className="text-sm text-gray-700 prose max-w-none">
            <p>
              {policy.content}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
            </p>
            <h3>Section 1: Purpose</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
            </p>
            <h3>Section 2: Scope</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
            </p>
            <h3>Section 3: Guidelines</h3>
            <ul>
              <li>Guideline 1: Lorem ipsum dolor sit amet</li>
              <li>Guideline 2: Consectetur adipiscing elit</li>
              <li>Guideline 3: Sed euismod, nisl vel ultricies lacinia</li>
              <li>Guideline 4: Nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl</li>
            </ul>
          </div>
        </div>
        
        <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Version {policy.version} • Last updated on {new Date(policy.updatedAt).toLocaleDateString()}
            </div>
            
            {!policy.acknowledged && (
              <button
                onClick={handleAcknowledge}
                disabled={isAcknowledging}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAcknowledging ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    I Acknowledge This Policy
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EtiquetteFeedback = () => {
  const { addToast } = useToast();
  const [feedbackType, setFeedbackType] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addToast({
        type: 'success',
        title: 'Feedback Submitted',
        message: 'Your feedback has been submitted successfully.'
      });
      
      // Reset form
      setFeedbackType('');
      setIsAnonymous(false);
      setRecipient('');
      setContent('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Etiquette Feedback</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Submit Feedback</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feedback Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                className={`py-2 px-4 border rounded-md text-sm font-medium ${
                  feedbackType === 'praise'
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setFeedbackType('praise')}
              >
                <ThumbsUp className="inline-block mr-2 h-4 w-4" />
                Praise
              </button>
              <button
                type="button"
                className={`py-2 px-4 border rounded-md text-sm font-medium ${
                  feedbackType === 'suggestion'
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setFeedbackType('suggestion')}
              >
                <MessageSquare className="inline-block mr-2 h-4 w-4" />
                Suggestion
              </button>
              <button
                type="button"
                className={`py-2 px-4 border rounded-md text-sm font-medium ${
                  feedbackType === 'concern'
                    ? 'bg-red-50 border-red-500 text-red-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setFeedbackType('concern')}
              >
                <Clock className="inline-block mr-2 h-4 w-4" />
                Concern
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center">
              <input
                id="anonymous"
                name="anonymous"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                Submit anonymously
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Your identity will not be revealed to the recipient if you choose to submit anonymously.
            </p>
          </div>
          
          <div className="mb-4">
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
              Recipient
            </label>
            <select
              id="recipient"
              name="recipient"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            >
              <option value="">Select a recipient</option>
              <option value="user-1">John Doe</option>
              <option value="user-2">Jane Smith</option>
              <option value="user-4">Alice Johnson</option>
              <option value="user-5">Charlie Lee</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Feedback Content
            </label>
            <textarea
              id="content"
              name="content"
              rows={4}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Provide your feedback here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!feedbackType || !recipient || !content || isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Submitting...
                </>
              ) : (
                'Submit Feedback'
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Feedback Guidelines</h2>
        
        <div className="prose max-w-none text-gray-700">
          <p>
            When providing feedback, please follow these guidelines to ensure it is constructive and helpful:
          </p>
          
          <h3>Be Specific</h3>
          <p>
            Provide concrete examples and specific situations rather than general statements.
          </p>
          
          <h3>Be Constructive</h3>
          <p>
            Focus on behaviors that can be changed, not personality traits. Offer suggestions for improvement.
          </p>
          
          <h3>Be Respectful</h3>
          <p>
            Use respectful language and consider how your feedback might be received. Avoid accusatory language.
          </p>
          
          <h3>Be Timely</h3>
          <p>
            Provide feedback as soon as possible after the event or behavior to ensure it is relevant and actionable.
          </p>
        </div>
      </div>
    </div>
  );
};

const KudosCenter = () => {
  const { addToast } = useToast();
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addToast({
        type: 'success',
        title: 'Kudos Sent',
        message: 'Your kudos has been sent successfully.'
      });
      
      // Reset form
      setRecipient('');
      setMessage('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Kudos Center</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Send Kudos</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient
                </label>
                <select
                  id="recipient"
                  name="recipient"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                >
                  <option value="">Select a recipient</option>
                  <option value="user-1">John Doe</option>
                  <option value="user-2">Jane Smith</option>
                  <option value="user-4">Alice Johnson</option>
                  <option value="user-5">Charlie Lee</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="What would you like to recognize them for?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    id="public"
                    name="public"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />
                  <label htmlFor="public" className="ml-2 block text-sm text-gray-700">
                    Make this kudos public
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Public kudos will be visible on the team feed. Private kudos will only be visible to the recipient.
                </p>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!recipient || !message || isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Send Kudos
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Team Kudos</h2>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    JS
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium">Jane Smith</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                      <ThumbsUp className="mr-1 h-3 w-3" />
                      Kudos
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Kudos to <span className="font-medium">Bob Wilson</span> for helping me debug that tricky issue with the API integration. Your expertise saved me hours of work!
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
                    AJ
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium">Alice Johnson</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                      <ThumbsUp className="mr-1 h-3 w-3" />
                      Kudos
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Kudos to <span className="font-medium">John Doe</span> for leading yesterday's meeting so efficiently. Everyone had a chance to speak and we finished on time with clear action items.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                    JD
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">5 days ago</p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                      <ThumbsUp className="mr-1 h-3 w-3" />
                      Kudos
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Kudos to <span className="font-medium">Charlie Lee</span> for stepping up to help with the client presentation on such short notice. Your slides were excellent and the client was impressed!
                </p>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Team Kudos
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Your Kudos Stats</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-amber-100">
                    <ThumbsUp className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="ml-2 text-sm text-gray-700">Kudos Received</span>
                </div>
                <span className="text-lg font-semibold">12</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100">
                    <ThumbsUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="ml-2 text-sm text-gray-700">Kudos Given</span>
                </div>
                <span className="text-lg font-semibold">8</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-purple-100">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="ml-2 text-sm text-gray-700">Team Rank</span>
                </div>
                <span className="text-lg font-semibold">#3</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Kudos Received</h2>
            
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xs">
                    JS
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium">Jane Smith</p>
                    <p className="text-xs text-gray-500">1 week ago</p>
                  </div>
                </div>
                <p className="text-xs text-gray-700 mt-1">
                  Thanks for your help with the project planning. Your organization skills made a big difference!
                </p>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold text-xs">
                    AJ
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium">Alice Johnson</p>
                    <p className="text-xs text-gray-500">2 weeks ago</p>
                  </div>
                </div>
                <p className="text-xs text-gray-700 mt-1">
                  Your presentation at the team meeting was excellent. Clear, concise, and informative!
                </p>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-xs">
                    JD
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">3 weeks ago</p>
                  </div>
                </div>
                <p className="text-xs text-gray-700 mt-1">
                  I appreciate how you always respond to questions so quickly and thoroughly. It helps the whole team move faster.
                </p>
              </div>
            </div>
            
            <div className="mt-3 text-center">
              <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                View All Received Kudos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EtiquetteHub;