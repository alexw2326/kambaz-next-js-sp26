/* eslint-disable @next/next/no-assign-module-variable */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { setModules, editModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import * as client from "../../client";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const [editingName, setEditingName] = useState("");
  const [saving, setSaving] = useState(false);
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();
  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(cid as string, moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };
  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await client.createModuleForCourse(cid as string, newModule);
    dispatch(setModules([...modules, module]));
  };
  const onUpdateModule = async (module: any) => {
    if (saving) return;
    setSaving(true);
    await client.updateModule(cid as string, module);
    const newModules = modules.map((m: any) => m._id === module._id ? module : m );
    dispatch(setModules(newModules));
    setSaving(false);
  };
  useEffect(() => {
    fetchModules();
  }, []);
  return (
    <div className="wd-modules">
      <ModulesControls moduleName={moduleName} setModuleName={setModuleName}
        addModule={onCreateModuleForCourse} /> <br /><br /><br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .map((module: any) => (
            <ListGroupItem key={module._id}>
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <FormControl className="w-50 d-inline-block"
                    value={editingName}
                    onChange={(e) =>
                      setEditingName(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateModule({ ...module, name: editingName, editing: false });
                      }
                    }} />
                )}
                <ModuleControlButtons moduleId={module._id}
                  deleteModule={(moduleId) => onRemoveModule(moduleId)}
                  editModule={(moduleId) => {
                    const module = modules.find((m: any) => m._id === moduleId);
                    setEditingName(module.name);
                    dispatch(editModule(moduleId));
                  }} />
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}