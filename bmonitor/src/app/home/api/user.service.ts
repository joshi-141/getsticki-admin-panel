import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';

// ALL USERS QUERY
const getAllUsers = (where: String, order: string) => gql`
query dataQuery($skip:Int!,$take:Int!){ 
dataQuery(table:"user.b_user.user",skip:$skip,take:$take
include:{ 
profile : {include: {preference:true }}
}
${where}
${order}
) {
data
}
}
`;

// FILTER_FOR_RELATIONSHIP QUERY
const FILTER_FOR_RELATIONSHIP = (where: String,) => gql`
query dataQuery{ 
  dataQuery(table:"user.b_user.user"
  include:{
  profile : {include: {preference:true }} 
  } 
  ${where}
  ) {
  data
  }
  }
`;
// SINGLE USERS QUERY
const GET_SINGLE_USER = gql`
query dataQuery($where:String!){ 
  dataQuery(table:"user.b_user.user"
  include:{
  profile : {include: {preference:true,photo:true }} 
  } where:{id:$where}
  ) {
  data
  }
  }
`;

// MATCHES USERS QUERY
const MATCHED_USER = gql`
query dataquery($id:String!){
 dataQuery(table:"user.b_user.user_link"
  include : {
     user1 : { include : { profile : true } },
     user2 : { include : { profile : true } },
  } where : {
    OR : [
     { user_id2 : $id },
     { user_id1 : $id },
  ]}){
    data
    error
    code
  }}
`;

// UPDATE PROFILE_STATUS AND RELATIONSHIP_STATUS QUERY
const UPDATE_PROFILE = gql`
mutation dataMutation($where:String,$status:String,$relation:Boolean,$bio:String){
  dataMutation(table:"user.b_user.profile" update: { 
    review_status:$status,relationship:$relation,bio:$bio
  } where:{user_id:$where}) {
    code
    data
  }
}
`;




// BIO DESCRIPTION UPDATE
const BIO_DESCRIPTION_UPDATE = gql`
mutation dataMutation($where:String,$description:String,$status:String){
  dataMutation(table:"user.b_user.bio"
    update : { description: $description ,status:$status}
    where : { profile_id : $where }
  ){
   code
   data
 }
}
`;


// PICTURE STATUS UPDATE

const pictureStatusUpadte = (whereQuery : String) => gql`
mutation dataMutation($where:String){
  dataMutation(table:"user.b_user.photo" update : {
    ${whereQuery}
 }
   where : { id : $where }
  ){
   code
   data
 }
}
`;

// USER COUNT QUERY
const totalCountRows = (where: String) => gql`
query dataCount{ 
dataCount(table:"user.b_user.user"
include:{ 
profile : {include: {preference:true }}
}
${where}
) {
data
}
}`;


// CHAT QUERY FOR GETTING MEMBER_ID
const CHAT_QUIERY = gql`
query dataQuery($where:String!){
  dataQuery(table:"chat.b_chat.member"
    where:{
      user_id: $where 
    }
    include:{
      conversation1: {include:{message:true}}
      conversation2: true
    }
  	 
  ) {
    data
  }
}
`;

// BLOCK AND REPORT QUERY

const BLOCK_REPORT = gql`
query dataQuery($where:String){ 
  dataQuery(table:"user.b_user.report"
   where:{user_id:$where}
  ) {
  data
  }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apollo: Apollo) { }
  async loadUser(cb: (x: any) => any, queryParams: any) {
    if (queryParams.whereCondOr != '') {
      queryParams.whereCond != '' ? queryParams.whereCond.OR = queryParams.whereCondOr : queryParams.whereCond = { OR: queryParams.whereCondOr };
    } else {
      if (queryParams.whereCond['OR']) delete queryParams.whereCond['OR']
    }
    const whereObjString = queryParams.whereCond != '' ? JSON.stringify(queryParams.whereCond).replace(/"(\w+)"\s*:/g, '$1:') : '';
    const where = whereObjString != '' ? `where:${whereObjString}` : ``;
    const orderBy = queryParams.orderBy ? queryParams.profile != null ? `orderBy : { ${queryParams.profile} : { ${queryParams.orderBy} : "${queryParams.orderMethod}" } }` : `orderBy:{ ${queryParams.orderBy} : "${queryParams.orderMethod}"}` : '';
    const query = this.apollo.query<any>({
      query: getAllUsers(where, orderBy),
      variables: {
        skip: queryParams.skip,
        take: queryParams.take,
      }
    }).pipe(map((data) => data));

    query.subscribe((res) => {
      const { data } = res;
      const { dataQuery } = data;
      cb(dataQuery);
    })
  }

  async getRelationShipFilter(cb: (x: any) => any, queryParams: any) {
    const where = queryParams.whereForRelation
    const query = this.apollo.query<any>({
      query: FILTER_FOR_RELATIONSHIP(where),
    }).pipe(map((data) => data));

    query.subscribe((res) => {
      const { data } = res;
      const { dataQuery } = data;
      cb(dataQuery);
    })
  }

  async getSingleUser(cb: (x: any) => any, queryParams: any) {
    const query = this.apollo.query<any>({
      query: GET_SINGLE_USER,
      variables: {
        where: queryParams.whereCond
      }
    }).pipe(map((data) => data));

    query.subscribe((res) => {
      const { data } = res;
      const { dataQuery } = data;
      cb(dataQuery);
    })
  }

  async matchedUsers(cb: (x: any) => any, queryParams: any) {
    const query = this.apollo.query<any>({
      query: MATCHED_USER,
      variables: {
        id: queryParams.whereCond
      }
    }).pipe(map((data) => data));

    query.subscribe((res) => {
      const { data } = res;
      const { dataQuery } = data;
      cb(dataQuery);
    })
  }

  async updateUserProfile(cb: (x: any) => any,queryParams: any) {
    const query = this.apollo.mutate<any>({
      mutation: UPDATE_PROFILE,
      variables: {
        where:queryParams.whereCond,
        status:queryParams.status,
        relation:queryParams.relation,
        bio:queryParams.bio
      }
    }).pipe(map((data) => data));

    query.subscribe((res) => { 
      const { data } = res;
      const { dataMutation } = data;
      cb(dataMutation);
    })
  }


  async bioDescriptionUpdate(cb: (x: any) => any,queryParams: any) {
    const query = this.apollo.mutate<any>({
      mutation: BIO_DESCRIPTION_UPDATE,
      variables: {
        where:"6ad49c95-688d-4f3c-b34b-d5e34b0a908e",
        description:queryParams.bio_discription,
        status:queryParams.bioStatus
      }
    }).pipe(map((data) => data));

    query.subscribe((res) => { 
      const { data } = res;
      const { dataMutation } = data;
      cb(dataMutation);
    })
  }

  async photoStatus(cb: (x: any) => any, queryParams : any) {
    const whereQuery = queryParams.picStatus == "CANCELED" ? `status : "${queryParams.picStatus}",admin_feedback : "${queryParams.picDescription ? queryParams.picDescription : 'Picture not clearly'}"` : `status : "${queryParams.picStatus}",admin_feedback : null `;
    const query = this.apollo.mutate<any>({
      mutation: pictureStatusUpadte(whereQuery),
      variables : {
        where : queryParams.whereId,
      }
    }).pipe(map((data) => data));
    query.subscribe((res) => { 
      const { data } = res;
      const { dataMutation } = data;
      cb(dataMutation);
    })
  }
  
  async totalRows(cb: (x: any) => any, queryParams : any) {
    if (queryParams.whereCondOr != '') {
      queryParams.whereCond != '' ? queryParams.whereCond.OR = queryParams.whereCondOr : queryParams.whereCond = { OR: queryParams.whereCondOr };
    } else {
      if (queryParams.whereCond['OR']) delete queryParams.whereCond['OR']
    }
    const whereObjString = queryParams.whereCond != '' ? JSON.stringify(queryParams.whereCond).replace(/"(\w+)"\s*:/g, '$1:') : '';
    const where = whereObjString != '' ? `where:${whereObjString}` : ``;
    const query = this.apollo.query<any>({
      query: totalCountRows(where),
    }).pipe(map((data) => data));
  
    query.subscribe((res) => { 
      const { data } = res;
      const { dataCount } = data;
      cb(dataCount);
    })
  }

  async getChatQuery(cb: (x: any) => any, queryParams: any) {
    const query = this.apollo.query<any>({
      query: CHAT_QUIERY,
      variables: {
        where: queryParams.whereCond
      }
    }).pipe(map((data) => data));

    query.subscribe((res) => {
      const { data } = res;
      const { dataQuery } = data;
      cb(dataQuery);
    })
  }

  async getBlockReport(cb: (x: any) => any, queryParams: any) {
    const query = this.apollo.query<any>({
      query: BLOCK_REPORT,
      variables: {
        where: queryParams.whereCond
      }
    }).pipe(map((data) => data));

    query.subscribe((res) => {
      const { data } = res;
      const { dataQuery } = data;
      cb(dataQuery);
    })
  }
}
