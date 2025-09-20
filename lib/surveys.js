// Survey configurations and templates

export const SURVEY_TYPES = {
  CAMPUS_HIRING_FEEDBACK: 'campus_hiring_feedback',
  ONSITE_EVENT_FEEDBACK: 'onsite_event_feedback',
  VIRTUAL_WEBINAR_FEEDBACK: 'virtual_webinar_feedback',
  TRAINING_WORKSHOP_FEEDBACK: 'training_workshop_feedback',
  PRODUCT_LAUNCH_FEEDBACK: 'product_launch_feedback',
  CAREER_FAIR_FEEDBACK: 'career_fair_feedback',
  HACKATHON_FEEDBACK: 'hackathon_feedback',
  LEADERSHIP_SUMMIT_FEEDBACK: 'leadership_summit_feedback',
};

export const SURVEY_CONFIGS = {
  [SURVEY_TYPES.CAMPUS_HIRING_FEEDBACK]: {
    id: 'campus_hiring_feedback',
    title: 'Campus Hiring Feedback',
    description: 'Feedback on campus recruitment events and interactions with students.',
    icon: 'GraduationCap',
    color: 'blue',
    questions: [
      {id:"q1",type:"rating",label:"Overall satisfaction with the campus event (1-5)",required:true},
      {id:"q2",type:"select",label:"How did you hear about our campus drive?",required:true,options:["Campus noticeboard","College coordinator","Social media","Faculty referral","Other"]},
      {id:"q3",type:"radio",label:"Was the registration process smooth?",required:true,options:["Yes","No"]},
      {id:"q4",type:"text_short",label:"If no, briefly explain the issue",required:false,maxLength:250},
      {id:"q5",type:"multi_select",label:"Which aspects impressed you? (pick up to 3)",required:false,options:["Company booth","Recruiter interaction","Pre-placement talk","Assessment fairness","Campus hospitality"]},
      {id:"q6",type:"checkbox",label:"Did you attend our technical talk or workshop?",required:false,options:["Technical talk","Hands-on workshop","Q&A session"]},
      {id:"q7",type:"rating",label:"Rate clarity of role and responsibilities communicated (1-5)",required:true},
      {id:"q8",type:"text_long",label:"Any suggestions to improve future campus drives?",required:false,maxLength:500},
      {id:"q9",type:"text_short",label:"Would you like to be contacted for future openings? (Yes/No)",required:true}
    ]
  },
  [SURVEY_TYPES.ONSITE_EVENT_FEEDBACK]: {
    id: 'onsite_event_feedback',
    title: 'Onsite Event Feedback',
    description: 'Feedback from attendees who visited an in-person company event.',
    icon: 'MapPin',
    color: 'teal',
    questions: [
      {id:"q1",type:"rating",label:"Overall event satisfaction (1-5)",required:true},
      {id:"q2",type:"select",label:"Which best describes your role at the event?",required:true,options:["Attendee","Speaker","Sponsor","Volunteer","Media"]},
      {id:"q3",type:"radio",label:"Was venue location and signage helpful?",required:true,options:["Yes","No"]},
      {id:"q4",type:"multi_select",label:"Which facilities did you use?",required:false,options:["Registration desk","Food court","Networking lounge","Help desk","Workshops"]},
      {id:"q5",type:"rating",label:"Quality of speaker sessions (1-5)",required:true},
      {id:"q6",type:"text_short",label:"Which session was most valuable to you?",required:false},
      {id:"q7",type:"checkbox",label:"Did you face any on-site issues?",required:false,options:["Access control","Audio/Video","Seating","Catering","None"]},
      {id:"q8",type:"text_long",label:"Suggestions for improving logistics or content",required:false,maxLength:500},
      {id:"q9",type:"radio",label:"Would you attend our next onsite event?",required:true,options:["Yes","No","Maybe"]}
    ]
  },
  [SURVEY_TYPES.VIRTUAL_WEBINAR_FEEDBACK]: {
    id: 'virtual_webinar_feedback',
    title: 'Virtual Webinar Feedback',
    description: 'Feedback for webinars, virtual talks and online panels.',
    icon: 'Monitor',
    color: 'purple',
    questions: [
      {id:"q1",type:"rating",label:"Overall webinar experience (1-5)",required:true},
      {id:"q2",type:"radio",label:"Was the webinar duration appropriate?",required:true,options:["Too short","Just right","Too long"]},
      {id:"q3",type:"checkbox",label:"Which technical aspects did you experience?",required:false,options:["Good audio","Good video","Connection issues","Slides unavailable","Chat moderation"]},
      {id:"q4",type:"text_short",label:"Which speaker/session did you like most?",required:false},
      {id:"q5",type:"rating",label:"How useful was the content to your role (1-5)?",required:true},
      {id:"q6",type:"select",label:"How would you like future webinars to be scheduled?",required:false,options:["Morning","Afternoon","Evening","Weekend"]},
      {id:"q7",type:"text_long",label:"Any content/topics you want in future webinars?",required:false,maxLength:400},
      {id:"q8",type:"radio",label:"Would you recommend this webinar to peers?",required:true,options:["Yes","No","Maybe"]}
    ]
  },
  [SURVEY_TYPES.TRAINING_WORKSHOP_FEEDBACK]: {
    id: 'training_workshop_feedback',
    title: 'Training Workshop Feedback',
    description: 'Collect feedback on instructor-led training and hands-on workshops.',
    icon: 'BookOpen',
    color: 'green',
    questions: [
      {id:"q1",type:"rating",label:"Overall training effectiveness (1-5)",required:true},
      {id:"q2",type:"select",label:"Training format attended",required:true,options:["Lecture","Hands-on lab","Blended"]},
      {id:"q3",type:"rating",label:"Instructor clarity (1-5)",required:true},
      {id:"q4",type:"checkbox",label:"Materials and resources provided",required:false,options:["Slides","Code samples","VM images","Cheat sheets"]},
      {id:"q5",type:"text_short",label:"Was the pace of training appropriate?",required:true},
      {id:"q6",type:"multi_select",label:"Which skills did you improve?",required:false,options:["Coding","Design","Testing","Cloud","Security"]},
      {id:"q7",type:"text_long",label:"Suggestions for trainers or content",required:false,maxLength:500},
      {id:"q8",type:"radio",label:"Would you attend advanced-level follow-up?",required:true,options:["Yes","No","Maybe"]}
    ]
  },
  [SURVEY_TYPES.PRODUCT_LAUNCH_FEEDBACK]: {
    id: 'product_launch_feedback',
    title: 'Product Launch Event Feedback',
    description: 'Feedback from attendees of a product launch or demo day.',
    icon: 'Rocket',
    color: 'orange',
    questions: [
      {id:"q1",type:"rating",label:"Satisfaction with the product demo (1-5)",required:true},
      {id:"q2",type:"radio",label:"Was the product value proposition clear?",required:true,options:["Yes","Somewhat","No"]},
      {id:"q3",type:"multi_select",label:"Which features impressed you most?",required:false,options:["Performance","Usability","Integration","Security","Cost"]},
      {id:"q4",type:"text_short",label:"Any feature you expected but didn't see?",required:false},
      {id:"q5",type:"rating",label:"Likelihood to recommend product to a peer (1-5)",required:true},
      {id:"q6",type:"text_long",label:"Use cases you think are best for this product",required:false,maxLength:400},
      {id:"q7",type:"checkbox",label:"Would you like a follow-up demo?",required:false,options:["Yes — technical demo","Yes — business demo","No"]}
    ]
  },
  [SURVEY_TYPES.CAREER_FAIR_FEEDBACK]: {
    id: 'career_fair_feedback',
    title: 'Career Fair Feedback',
    description: 'Feedback from students and professionals who visited a career fair.',
    icon: 'Users',
    color: 'indigo',
    questions: [
      {id:"q1",type:"rating",label:"Overall experience at the career fair (1-5)",required:true},
      {id:"q2",type:"select",label:"What brought you to our booth?",required:true,options:["Job opportunities","Internships","Company research","Networking","Other"]},
      {id:"q3",type:"radio",label:"Was our recruiter helpful?",required:true,options:["Yes","No"]},
      {id:"q4",type:"text_short",label:"Which role/teams were you most interested in?",required:false},
      {id:"q5",type:"multi_select",label:"Materials you took from our booth",required:false,options:["Brochure","Business card","Giveaways","QR code/links"]},
      {id:"q6",type:"rating",label:"Clarity of role descriptions (1-5)",required:true},
      {id:"q7",type:"text_long",label:"Suggestions for our booth or recruiter approach",required:false,maxLength:500}
    ]
  },
  [SURVEY_TYPES.HACKATHON_FEEDBACK]: {
    id: 'hackathon_feedback',
    title: 'Hackathon Feedback',
    description: 'Collect feedback from participants, mentors and judges at a hackathon.',
    icon: 'Code',
    color: 'red',
    questions: [
      {id:"q1",type:"rating",label:"Overall hackathon experience (1-5)",required:true},
      {id:"q2",type:"select",label:"Your role in the hackathon",required:true,options:["Participant","Mentor","Judge","Organizer"]},
      {id:"q3",type:"multi_select",label:"Which resources were helpful?",required:false,options:["Mentors","APIs/SDKs","Workshops","Cloud credits","Hardware"]},
      {id:"q4",type:"text_short",label:"Main challenge you faced",required:false},
      {id:"q5",type:"rating",label:"Fairness of judging (1-5)",required:true},
      {id:"q6",type:"checkbox",label:"Did you form a team onsite or online?",required:false,options:["Onsite","Online","Already had a team"]},
      {id:"q7",type:"text_long",label:"Suggestions for future hackathons",required:false,maxLength:500}
    ]
  },
  [SURVEY_TYPES.LEADERSHIP_SUMMIT_FEEDBACK]: {
    id: 'leadership_summit_feedback',
    title: 'Leadership Summit Feedback',
    description: 'Feedback from attendees of leadership summits, panels and executive roundtables.',
    icon: 'Crown',
    color: 'amber',
    questions: [
      {id:"q1",type:"rating",label:"Overall satisfaction with the summit (1-5)",required:true},
      {id:"q2",type:"select",label:"Your attendee type",required:true,options:["Executive","Manager","Speaker","Sponsor","Partner"]},
      {id:"q3",type:"rating",label:"Quality of discussions and panels (1-5)",required:true},
      {id:"q4",type:"text_short",label:"A key insight you took away",required:false},
      {id:"q5",type:"multi_select",label:"Topics you found most valuable",required:false,options:["Strategy","Culture","Innovation","Sustainability","Talent"]},
      {id:"q6",type:"checkbox",label:"Would you be interested in a follow-up roundtable?",required:false,options:["Yes — regional","Yes — functional","No"]},
      {id:"q7",type:"text_long",label:"Suggestions to improve future summits",required:false,maxLength:500}
    ]
  }
};

export const getSurveyConfig = (surveyType) => {
  return SURVEY_CONFIGS[surveyType] || null;
};

export const getAllSurveyTypes = () => {
  return Object.values(SURVEY_CONFIGS);
};

export const getSurveyTypeById = (id) => {
  return Object.values(SURVEY_CONFIGS).find(config => config.id === id);
};
