import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedGroup, clearSelectedGroup } from '../JS/actions/groupAction';
import GroupChat from '../components/GroupChat';

const Groups = () => {
  const dispatch = useDispatch();
  const groups = useSelector(state => state.groupReducer.groups);
  const selectedGroup = useSelector(state => state.groupReducer.selectedGroup);

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      {/* Sidebar liste des groupes */}
      <div className="w-60 border-r border-zinc-700 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Groupes</h2>
        {groups.length === 0 && <p className="text-zinc-500">Aucun groupe trouvé</p>}
        {groups.map(group => (
          <div
            key={group._id}
            onClick={() => dispatch(setSelectedGroup(group))}
            className={`cursor-pointer p-3 rounded-lg mb-2 transition 
              ${selectedGroup?._id === group._id ? 'bg-blue-600' : 'hover:bg-zinc-700'}`}
          >
            {group.name}
          </div>
        ))}
        {selectedGroup && (
          <button
            onClick={() => dispatch(clearSelectedGroup())}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
          >
            Quitter le groupe
          </button>
        )}
      </div>

      {/* Section discussion du groupe */}
      <div className="flex-1 p-4">
        {selectedGroup ? (
          <GroupChat />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500 text-lg">
            Sélectionnez un groupe pour commencer à discuter
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
