using System;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.UI.WebControls;
using System.Diagnostics;
using System.Configuration;

namespace cms_library
{

    public class clsDB : System.Web.UI.Page
    {

        #region  Decration Variable
        protected SqlConnection objConn;
        protected SqlCommand objCmd;
        private String strConnString = "";
        private string strSql = "";
        #endregion

        #region Constructor
        public clsDB()
        {
            //connectDB();

        }

        public clsDB(bool connected)
        {


        }
        #endregion

        #region Connect
        public void connectDB()
        {
            try
            {

                string strConnString = ConfigurationManager.AppSettings["ConnectionString_db"].ToString();
                SqlConnectionStringBuilder strbldr = new SqlConnectionStringBuilder(strConnString);
                //strbldr.ColumnEncryptionSetting = SqlConnectionColumnEncryptionSetting.Enabled;
                objConn = new SqlConnection(strbldr.ConnectionString);
                //objConn = new SqlConnection(strConnString);

            }
            catch (Exception ex)
            {
                Response.Redirect("../info/errorInfo.html");

            }

        }
        #endregion

        #region Close DB
        public void closeDB()
        {
            try
            {
                if (objConn.State == ConnectionState.Open)
                {

                    objConn.Close();

                }

            }
            catch (Exception ex)
            {
                //objLog.writeLog(ex, base.ToString(), new StackFrame().GetMethod().ToString());


            }

        }
        #endregion

        #region open DB
        public void openDB()
        {
            try
            {

                if (objConn != null && objConn.State == ConnectionState.Open)
                {
                    objConn.Close();
                }
                connectDB();


                if (objConn.State == ConnectionState.Closed)
                {
                    objConn.Open();
                }

            }
            catch (Exception ex)
            {

                HttpContext.Current.Response.Redirect("../info/errorInfo.html");

            }

        }
        #endregion

        public DataTable ExecucteSql_by_param(string sql, object paramAll)
        {
            DataTable dt = new DataTable();
            try
            {
                openDB();
                using (SqlCommand cmd = objConn.CreateCommand())
                {
                    cmd.CommandText = sql;

                    if (paramAll != null)
                    {
                        ListItemCollection objParam = (ListItemCollection)paramAll;

                        //=== loop add param ===
                        foreach (ListItem param in objParam)
                        {
                            cmd.Parameters.Add(new SqlParameter("@" + param.Text, param.Value));
                            cmd.CommandType = CommandType.Text;

                        }
                    }

                    using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                    {
                        DataSet ds = new DataSet();
                        sda.Fill(ds);

                        if (ds != null && ds.Tables.Count > 0)
                        {
                            dt = ds.Tables[0];
                        }
                        sda.Dispose();
                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;

            }
            finally
            {
                closeDB();
            }

            return dt;


        }

    }
}
