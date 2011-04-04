/*
    ejsConfig.c -- Config class
  
    Copyright (c) All Rights Reserved. See details at the end of the file.
 */

/********************************** Includes **********************************/

#include    "ejs.h"

/*********************************** Methods **********************************/

void ejsCreateConfigType(Ejs *ejs)
{
    ejsCreateNativeType(ejs, N("ejs", "Config"), sizeof(EjsObj), S_Config, ES_Config_NUM_CLASS_PROP, ejsManagePot, 
        EJS_POT_HELPERS);
}


void ejsDefineConfigProperties(Ejs *ejs)
{
    EjsType     *type;
    char        version[16];

    if (ejs->configSet) {
        return;
    }
    ejs->configSet = 1;
    type = ST(Config);
    ejsDefineProperty(ejs, type, ES_Config_Debug, N("public", "Debug"), 0, 0, BLD_DEBUG ? S(true): S(false));
    ejsDefineProperty(ejs, type, ES_Config_CPU, N("public", "CPU"), 0, 0, ejsCreateStringFromAsc(ejs, BLD_HOST_CPU));
    ejsDefineProperty(ejs, type, ES_Config_OS, N("public", "OS"), 0, 0, ejsCreateStringFromAsc(ejs, BLD_OS));
    ejsDefineProperty(ejs, type, ES_Config_Product, N("public", "Product"), 0, 0, ejsCreateStringFromAsc(ejs, BLD_PRODUCT));

    ejsDefineProperty(ejs, type, ES_Config_Title, N("public", "Title"), 0, 0, ejsCreateStringFromAsc(ejs, BLD_NAME));
    mprSprintf(version, sizeof(version), "%s-%s", BLD_VERSION, BLD_NUMBER);
    ejsDefineProperty(ejs, type, ES_Config_Version, N("public", "Version"), 0, 0, ejsCreateStringFromAsc(ejs, version));

    ejsDefineProperty(ejs, type, ES_Config_Legacy, N("public", "Legacy"), 0, 0, ejsCreateBoolean(ejs, BLD_FEATURE_LEGACY_API));
    //  MOB - should genercise this
    ejsDefineProperty(ejs, type, ES_Config_SSL, N("public", "SSL"), 0, 0, ejsCreateBoolean(ejs, BLD_FEATURE_SSL));
    ejsDefineProperty(ejs, type, ES_Config_SQLITE, N("public", "SQLITE"), 0, 0, ejsCreateBoolean(ejs, BLD_FEATURE_SQLITE));

#if BLD_WIN_LIKE
{
    EjsString    *path;

    path = ejsCreateStringFromAsc(ejs, mprGetAppDir(ejs));
    ejsDefineProperty(ejs, type, ES_Config_BinDir, N("public", "BinDir"), 0, 0, path);
    ejsDefineProperty(ejs, type, ES_Config_ModDir, N("public", "ModDir"), 0, 0, path);
    ejsDefineProperty(ejs, type, ES_Config_LibDir, N("public", "LibDir"), 0, 0, path);
}
#else
#ifdef BLD_BIN_PREFIX
    ejsDefineProperty(ejs, type, ES_Config_BinDir, N("public", "BinDir"), 0, 0, ejsCreateStringFromAsc(ejs, BLD_BIN_PREFIX));
#endif
#ifdef BLD_MOD_PREFIX
    ejsDefineProperty(ejs, type, ES_Config_ModDir, N("public", "ModDir"), 0, 0, ejsCreateStringFromAsc(ejs, BLD_MOD_PREFIX));
#endif
#ifdef BLD_LIB_PREFIX
    ejsDefineProperty(ejs, type, ES_Config_LibDir, N("public", "LibDir"), 0, 0, ejsCreateStringFromAsc(ejs, BLD_LIB_PREFIX));
#endif
#endif
}


/*
    @copy   default
  
    Copyright (c) Embedthis Software LLC, 2003-2011. All Rights Reserved.
    Copyright (c) Michael O'Brien, 1993-2011. All Rights Reserved.
  
    This software is distributed under commercial and open source licenses.
    You may use the GPL open source license described below or you may acquire
    a commercial license from Embedthis Software. You agree to be fully bound
    by the terms of either license. Consult the LICENSE.TXT distributed with
    this software for full details.
  
    This software is open source; you can redistribute it and/or modify it
    under the terms of the GNU General Public License as published by the
    Free Software Foundation; either version 2 of the License, or (at your
    option) any later version. See the GNU General Public License for more
    details at: http://www.embedthis.com/downloads/gplLicense.html
  
    This program is distributed WITHOUT ANY WARRANTY; without even the
    implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  
    This GPL license does NOT permit incorporating this software into
    proprietary programs. If you are unable to comply with the GPL, you must
    acquire a commercial license to use this software. Commercial licenses
    for this software and support services are available from Embedthis
    Software at http://www.embedthis.com
  
    Local variables:
    tab-width: 4
    c-basic-offset: 4
    End:
    vim: sw=4 ts=4 expandtab

    @end
 */
