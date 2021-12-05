const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const cors = require( `cors` );
const App =express();

/* Đây là ví dụ schema đã được khởi tạo */

const corsOptions ={
  origin:'https://localhost:3000/', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
App.use(cors(corsOptions));
App.use(
    `/graphql`,
    graphqlHTTP( {
        schema: schema, // point to your schema 
        rootValue: rootResolver, // point to your resolver 
        graphiql: true
    } )
);
var schema = buildSchema(`
  type Query {
    slider(id: Int!): Slider
    sliders(topic:String): [Slider]
  }
  type Slider {
    id: Int,
    title: String
    url: String
    para: String
  }

`);
var sliderdata =[
  {
      id:1,
      title: "Guerrilla Public Service Redux (2017)",
      url: "https://thegioidohoacom.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2018/12/12023827/thi%E1%BA%BFt-k%E1%BA%BF-banner-sinh-nh%E1%BA%ADt-4.png",
      para: "23325319"
  },
  {
    id:2,
    title: "Guerrilla Public Service Redux (2017)",
    url: "https://thegioidohoacom.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2018/12/12023827/thi%E1%BA%BFt-k%E1%BA%BF-banner-sinh-nh%E1%BA%ADt-4.png",
    para: "23325319"
  }
]
var  getSlider = function(args){
  var id = args.id;
  return sliderdata.filter(slider =>{
    return slider.id==id;
  })[0];

}
var  getSliders = function(args){
    if(args.title){
      var title=args.title;
      return sliderdata.filter(slider=>slider.title == title
      );
    }else{
      return sliderdata;  
    }
}
// Root provides a resolver function for each API endpoint
var root = {
  slider:getSlider,
  sliders:getSliders
};

const app = express();
app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true //Set to false if you don't want graphiql enabled
}));

app.listen(4000,()=>console.log('GraphQL API server running at localhost:'));
app.use(cors(corsOptions));