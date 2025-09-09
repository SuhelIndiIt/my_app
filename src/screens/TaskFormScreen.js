import * as Yup from "yup";

import {
  Button,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import PrimaryBtn from "../componets/PrimaryBtn";
import { useTasks } from "../context/TasksContext";
import { useThemeCtx } from "../context/ThemeContext";

// Validation schema
const TaskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  priority: Yup.string().oneOf(["Low", "Medium", "High"]).required(),
});

export default function TaskFormScreen({ route, navigation }) {
  const { taskId } = route.params || {};
  const { tasks, createTask, updateTask } = useTasks();
  const { colors } = useThemeCtx();
  const styles = createStyles(colors);

  const existingTask = taskId ? tasks.find((t) => t.id === taskId) : null;
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  return (
    <Formik
      initialValues={{
        title: existingTask?.title || "",
        description: existingTask?.description || "",
        priority: existingTask?.priority || "Low",
        dueDate: existingTask?.dueDate ? new Date(existingTask.dueDate) : null,
        tags: existingTask?.tags || [],
      }}
      validationSchema={TaskSchema}
      onSubmit={(values) => {
        if (existingTask) {
          updateTask(existingTask.id, {
            ...values,
            dueDate: values.dueDate ? values.dueDate.toISOString() : null,
          });
        } else {
          createTask({
            ...values,
            dueDate: values.dueDate ? values.dueDate.toISOString() : null,
          });
        }
        navigation.goBack();
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={[styles.header, { color: colors.text }]}>
              {existingTask ? "Edit Task" : "New Task"}
            </Text>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                Title *
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: colors.border,
                    color: colors.text,
                    backgroundColor: colors.card,
                  },
                ]}
                placeholder="Enter task title"
                placeholderTextColor={colors.textSecondary}
                value={values.title}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
              />
              {errors.title && touched.title && (
                <Text style={[styles.error, { color: colors.danger }]}>
                  {errors.title}
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                Description
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    height: 100,
                    textAlignVertical: "top",
                    borderColor: colors.border,
                    color: colors.text,
                    backgroundColor: colors.card,
                  },
                ]}
                placeholder="Enter task description"
                placeholderTextColor={colors.textSecondary}
                multiline
                value={values.description}
                onChangeText={handleChange("description")}
              />
            </View>

            <View style={[styles.inputContainer, { marginBottom: 8 }]}>
              <Text style={[styles.label, { color: colors.text }]}>
                Priority
              </Text>
              <View style={styles.priorityContainer}>
                {["Low", "Medium", "High"].map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.priorityBtn,
                      {
                        backgroundColor:
                          values.priority === level
                            ? colors.primary
                            : colors.backgroundSecondary,
                        borderColor: colors.border,
                      },
                      values.priority === level && styles.prioritySelected,
                    ]}
                    onPress={() => setFieldValue("priority", level)}
                  >
                    <Text
                      style={{
                        color: values.priority === level ? "#fff" : "#000",
                      }}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                Due Date
              </Text>
              <TouchableOpacity
                style={[
                  styles.dateBtn,
                  {
                    backgroundColor: colors.backgroundSecondary,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setDatePickerVisible(true)}
              >
                <Text
                  style={{
                    color: values.dueDate ? colors.text : colors.textSecondary,
                  }}
                >
                  {values.dueDate
                    ? `Due: ${values.dueDate.toLocaleDateString()}`
                    : "Select a due date (optional)"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <PrimaryBtn
                label={existingTask ? "Update Task" : "Create Task"}
                onPress={handleSubmit}
                style={{
                  marginTop: 24,
                  backgroundColor: colors.primary,
                  width: "45%",
                }}
              />
              <PrimaryBtn
                label="Cancel"
                onPress={() => navigation.goBack()}
                style={{
                  marginTop: 12,
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: colors.border,
                  width: "45%",
                }}
                textStyle={{ color: colors.text }}
              />
            </View>

            <Modal
              visible={datePickerVisible}
              transparent
              onRequestClose={() => setDatePickerVisible(false)}
            >
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View style={[styles.modalDate]}>
                  <DateTimePicker
                    value={values.dueDate || new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(event, selectedDate) => {
                      setDatePickerVisible(Platform.OS === "ios"); // keep open on iOS
                      if (event.type !== "dismissed" && selectedDate) {
                        setFieldValue("dueDate", selectedDate);
                      }
                    }}
                  />
                  <PrimaryBtn
                    label="Ok"
                    onPress={() => setDatePickerVisible(false)}
                    style={{
                      marginTop: 12,
                      backgroundColor: colors.primary,
                      width: "90%",
                    }}
                    textStyle={{ color: colors.text }}
                  />
                </View>
              </View>
            </Modal>
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 24,
      marginTop: 8,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      padding: 12,
      borderRadius: 8,
      fontSize: 16,
    },
    priorityContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 4,
    },
    priorityBtn: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      marginHorizontal: 4,
      alignItems: "center",
      justifyContent: "center",
    },
    prioritySelected: {
      borderColor: colors.primary,
    },
    dateBtn: {
      borderWidth: 1,
      padding: 14,
      borderRadius: 8,
      justifyContent: "center",
      height: 50,
    },
    buttonContainer: {
      marginTop: 8,
      marginBottom: 24,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    error: {
      fontSize: 12,
      marginTop: 4,
    },
    modalDate: {
      backgroundColor: "#fff",
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      height: "35%",
    },
  });
