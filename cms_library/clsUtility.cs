using System;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.UI.WebControls;
using System.Diagnostics;
using System.Configuration;

namespace cms_library
{

    public class clsUtility : System.Web.UI.Page
    {
        private clsDB objDB = new clsDB();
        public void DropDownList_Data(ref DropDownList objRef, string strValue, string strText, string strTable, string strCondition, bool defalutBlank, object param)
        {
            try
            {


                string sql = "SELECT " + strValue + "," + strText + " FROM " + strTable;
                sql += " WHERE  isnull(IsDeleted,'False') ='False' and  IsActived ='True'";
                // sql += " WHERE  1=1  ";
                if (strCondition.Trim() != "")
                {
                    sql += " AND " + strCondition;
                }

                if (strCondition.IndexOf("Order") >= 0)
                {

                }
                else
                {
                    sql += " Order by  " + strText + " ASC ";

                }


                DataTable dt = objDB.ExecucteSql_by_param(sql, param);
                if (dt != null && dt.Rows.Count > 0)
                {

                    dt.TableName = strTable;
                    objRef.DataSource = dt;
                    objRef.DataTextField = dt.Columns[1].ColumnName;
                    objRef.DataValueField = dt.Columns[0].ColumnName;
                    objRef.DataBind();

                    if (defalutBlank == true)
                    {

                        objRef.Items.Insert(0, new ListItem("   Show All   ", ""));
                        objRef.SelectedValue = "";

                    }
                }



            }
            catch (Exception ex)
            {
                //objLog.writeLog(ex);
            }
        }



        public string ReplaceInjection(string str)
        {
            string[] _blacklist = new string[] { "'", "\\", "\"", "*/", ";", "--", "<script", "AND", "/*", "</script>", "<ScRiPt", "</ScRiPt>", "waitfor", "0:0:", "<acx>", "À", "§", "¢" };
            //string[] _blacklist = new string[] {"'", "\\", "\"", "*/", "/" , ";", "--", "<script", "AND", "/*", "</script>", "<ScRiPt", "</ScRiPt>", "waitfor", "0:0:", "<acx>" };
            string strRep = str;
            if (strRep == null || strRep.Trim().Equals(String.Empty))
                return strRep;
            foreach (string _blk in _blacklist) { strRep = strRep.Replace(_blk, ""); }


            return strRep;
        }
    }
}
