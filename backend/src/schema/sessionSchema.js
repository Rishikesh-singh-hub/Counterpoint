import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema({
    id:{
        type: String,
        required: false
    },
    userId:{
        type:String,
        required: false
    },
    persona:{
        type:String,
        required: false
    },
    topic:{
        type:String,
        required: false
    },
    messages: [
    {
      role: String,
      content: String,
      createdAt: { type: Date, default: Date.now }
    }
    ],
    summary:{
        type:String,
        required: false
    }  
},{ timestamps: true });

const session = mongoose.model("Session",sessionSchema)

export default session;

// sessions
// --------
// id
// user_id
// persona
// topic
// status
// created_at
// updated_at