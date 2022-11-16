import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';

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

const GET_SINGLE_USER = gql`
query dataQuery($where:String!){ 
  dataQuery(table:"user.b_user.user"
  include:{
  profile : {include: {preference:true }} 
  } where:{id:$where}
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

  async getSingleUser(cb: (x: any) => any,queryParams: any) {
    const query = this.apollo.query<any>({
      query: GET_SINGLE_USER,
      variables: {
        where:queryParams.whereCond
      }
    }).pipe(map((data) => data));

    query.subscribe((res) => { 
      const { data } = res;
      const { dataQuery } = data;
      cb(dataQuery);
    })
  }
}
