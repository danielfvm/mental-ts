#include <cstdio>
extern "C"
{
    #include <lua.h>
    #include <lauxlib.h>
    #include <lualib.h>
}

#include <LuaBridge/LuaBridge.h>
#include <SFML/OpenGL.hpp>

void enableCullFace()
{
    glEnable(GL_CULL_FACE);
    glCullFace(GL_BACK);
    glFrontFace(GL_CW);  
    glEnable(GL_DEPTH_TEST);

    printf("Culling enabled\n");
}

#if defined(_MSC_VER) 
    #define MY_LIB_API __declspec(dllexport) // Microsoft  
#elif defined(__GNUC__) 
    #define MY_LIB_API __attribute__((visibility("default"))) // GCC 
#else 
    #define MY_LIB_API // Most compilers export all the symbols by default. We hope for the best here. 
    #pragma warning Unknown dynamic link import/export semantics.
#endif

// entrypoint to the Lua library
// this will be called any time you run `require('cpp_library')` in Lua code
// note how the name is dictated by Lua convention, `luaopen_${library_name.replaceAll('.', '_').replaceAll('-', '_')}`
// it also _has_ to be an `extern "C"` and exported from the library (`__declspec(dllexport)`)
extern "C" MY_LIB_API int luaopen_addons_my_addon_logic_libcpp_library(lua_State* L)
{
    luabridge::getGlobalNamespace(L)
        .beginNamespace("custom")
            .addFunction("enableCullFace", enableCullFace)
        .endNamespace();

    return 0;
}
