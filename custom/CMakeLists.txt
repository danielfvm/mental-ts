cmake_minimum_required(VERSION 3.20 FATAL_ERROR)

set(PROJECT_NAME "cpp_library")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/lib)

project(${PROJECT_NAME} LANGUAGES CXX)
set(TARGET_NAME "cpp_library")

set(SOURCES "library.cpp")
add_library(${TARGET_NAME} SHARED ${SOURCES})

target_compile_features(${TARGET_NAME} PRIVATE cxx_std_20)
target_link_options(${TARGET_NAME} PRIVATE "-W")

find_package(Lua REQUIRED)
target_link_libraries(${TARGET_NAME} PRIVATE ${LUA_LIBRARIES})
target_include_directories(${TARGET_NAME} PRIVATE ${LUA_INCLUDE_DIR})

set(LUABRIDGE3_INCLUDE_DIRS "/usr/include/LuaBridge")
target_include_directories(${TARGET_NAME} PRIVATE ${LUABRIDGE3_INCLUDE_DIRS})
