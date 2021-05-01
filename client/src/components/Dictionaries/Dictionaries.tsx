import { useQuery } from "@apollo/client";
import {GET_ALL_DICTIONARIES} from './../../common/Graphql/query'
import { IDictionary } from "../../common/Types/types";
import Dictionary from "./Dictionary";
interface DictionariesProps {}



const Dictionaries: React.FC<DictionariesProps> = () => {

   const {loading,data,error} = useQuery(GET_ALL_DICTIONARIES, {fetchPolicy: "no-cache"});
   if(loading) return <div>Loading</div>
   if(error) console.log(error);
   const dictionaries = data.getAllDictionaries;

   return (
      <div className="dictionaries">
         <h2 className="title">Словари</h2>
         <div className="title_desc">
            В этом разделе вы можете выбрать предпочитаемые словари, из которых
            будет происходить выборка слов
         </div>
         <div className="dicts_wrapper">
            {dictionaries.map((item: IDictionary) => {
               return <Dictionary dictionary={item}/>
            })}
            {/* <Dictionary name={data.}/> */}
         </div>
      </div>
   );
};

export default Dictionaries;
