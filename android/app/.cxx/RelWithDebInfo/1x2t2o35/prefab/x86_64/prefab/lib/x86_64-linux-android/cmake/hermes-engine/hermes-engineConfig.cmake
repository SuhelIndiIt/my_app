if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/apple/.gradle/caches/8.10.2/transforms/f9be8acfc753ef6f3f547af2c27859c1/transformed/jetified-hermes-android-0.76.1-release/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/apple/.gradle/caches/8.10.2/transforms/f9be8acfc753ef6f3f547af2c27859c1/transformed/jetified-hermes-android-0.76.1-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

